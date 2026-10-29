/**
 * إعدادات التطبيق المركزية — تُقرأ من متغيرات البيئة فقط.
 * ملاحظة أمنية: كل متغير يبدأ بـ VITE_ يصبح جزءًا من كود المتصفح،
 * لذا لا يجوز وضع كلمات مرور أو مفاتيح سرية هنا.
 */
const env = import.meta.env;

const toNumber = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export const config = Object.freeze({
  apiBaseUrl: (env.VITE_API_BASE_URL || '/api').replace(/\/+$/, ''),
  apiTimeout: toNumber(env.VITE_API_TIMEOUT, 15000),
  useMock: String(env.VITE_USE_MOCK ?? 'true').toLowerCase() === 'true',
  mockErrorRate: Math.min(Math.max(toNumber(env.VITE_MOCK_ERROR_RATE, 0), 0), 1),
  defaultPageSize: 10,
  pageSizeOptions: [10, 20, 50],
});
