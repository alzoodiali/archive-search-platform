/**
 * طبقة خدمة البحث — الواجهة الوحيدة التي تستدعيها الصفحات.
 * عند VITE_USE_MOCK=true تستخدم الخادم التجريبي، وإلا تتصل بالـ API الحقيقي.
 * الصفحات لا تعرف (ولا تحتاج أن تعرف) مصدر البيانات.
 */
import { api } from './api';
import { config } from './config';
import { ENDPOINTS } from './endpoints';
import { mockServer } from './mock/mockServer';

export const isDemoMode = config.useMock;

const realApi = {
  getDatabases: ({ signal } = {}) => api.get(ENDPOINTS.databases, { signal }).then((r) => r.data),
  getSearchFilters: ({ signal } = {}) => api.get(ENDPOINTS.searchFilters, { signal }).then((r) => r.data),
  simpleSearch: (payload, { signal } = {}) =>
    api.post(ENDPOINTS.simpleSearch, payload, { signal }).then((r) => r.data),
  advancedSearch: (payload, { signal } = {}) =>
    api.post(ENDPOINTS.advancedSearch, payload, { signal }).then((r) => r.data),
  getFileById: (id, { signal } = {}) => api.get(ENDPOINTS.fileById(id), { signal }).then((r) => r.data),
};

export const searchService = isDemoMode ? mockServer : realApi;
