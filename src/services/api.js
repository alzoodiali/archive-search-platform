import axios from 'axios';
import { config } from './config';

/** خطأ موحّد تتعامل معه الواجهة بدل أخطاء Axios الخام */
export class ApiError extends Error {
  constructor(message, { status = 0, code = 'UNKNOWN', details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const AUTH_EXPIRED_EVENT = 'auth:expired';
const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  get: () => sessionStorage.getItem(TOKEN_KEY),
  set: (token) => sessionStorage.setItem(TOKEN_KEY, token),
  clear: () => sessionStorage.removeItem(TOKEN_KEY),
};

const STATUS_MESSAGES = {
  400: 'البيانات المرسلة غير صحيحة.',
  401: 'انتهت الجلسة، يرجى تسجيل الدخول مجددًا.',
  403: 'ليست لديك صلاحية لتنفيذ هذا الإجراء.',
  404: 'العنصر المطلوب غير موجود.',
  408: 'انتهت مهلة الطلب.',
  422: 'تحقق من صحة الحقول المدخلة.',
  429: 'طلبات كثيرة، يرجى المحاولة بعد قليل.',
  500: 'حدث خطأ في الخادم، يرجى المحاولة لاحقًا.',
  503: 'الخدمة غير متاحة مؤقتًا.',
};

/** يحوّل أي خطأ (Axios / شبكة / إلغاء) إلى ApiError برسالة عربية واضحة */
export function normalizeError(error) {
  if (error instanceof ApiError) return error;

  if (axios.isCancel(error) || error?.name === 'CanceledError' || error?.name === 'AbortError') {
    return new ApiError('تم إلغاء الطلب.', { code: 'CANCELED' });
  }

  if (error?.code === 'ECONNABORTED') {
    return new ApiError(STATUS_MESSAGES[408], { status: 408, code: 'TIMEOUT' });
  }

  if (error?.response) {
    const { status, data } = error.response;
    // يدعم صيغة ProblemDetails الخاصة بـ ASP.NET Core
    const serverMessage = data?.message || data?.title || data?.detail;
    return new ApiError(serverMessage || STATUS_MESSAGES[status] || 'حدث خطأ غير متوقع.', {
      status,
      code: data?.code || `HTTP_${status}`,
      details: data?.errors || null,
    });
  }

  if (error?.request) {
    return new ApiError('تعذّر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.', { code: 'NETWORK' });
  }

  return new ApiError(error?.message || 'حدث خطأ غير متوقع.');
}

export const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

api.interceptors.request.use((request) => {
  const token = tokenStorage.get();
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeError(error);
    if (normalized.status === 401) {
      tokenStorage.clear();
      window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
    }
    return Promise.reject(normalized);
  },
);
