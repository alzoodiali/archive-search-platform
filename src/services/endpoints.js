/**
 * مسارات الـ API.
 *
 * ⚠️ لا يوجد Backend حاليًا. هذه المسارات "عقد مقترح" (Proposed Contract)
 * صُمم ليتوافق مع ASP.NET Core Web API، ويجب اعتماده أو تعديله
 * مع فريق الـ Backend قبل الربط الفعلي. التوثيق الكامل في docs/API_CONTRACT.md
 */
export const ENDPOINTS = Object.freeze({
  databases: '/databases', //            GET
  searchFilters: '/search/filters', //   GET
  simpleSearch: '/search/simple', //     POST
  advancedSearch: '/search/advanced', // POST
  fileById: (id) => `/files/${encodeURIComponent(id)}`, // GET
});
