/**
 * ⚠️ خادم تجريبي داخل المتصفح (DEMO ONLY).
 * يحاكي سلوك الـ Backend المقترح (التأخير، التحقق، الترقيم، الأخطاء)
 * ويعيد نفس شكل الاستجابة المتوقع من الـ API الحقيقي.
 */
import { ApiError } from '../api';
import { config } from '../config';
import { normalizeArabic, tokenize } from '../../utils/arabic';
import { DATABASES, FILES, FILE_TYPES, SOURCES } from './mockData';

const sleep = (ms, signal) =>
  new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(t);
      reject(new ApiError('تم إلغاء الطلب.', { code: 'CANCELED' }));
    });
  });

async function simulateNetwork(signal) {
  await sleep(350 + Math.random() * 450, signal);
  if (config.mockErrorRate > 0 && Math.random() < config.mockErrorRate) {
    throw new ApiError('تعذّر الاتصال بالخادم (خطأ تجريبي محاكى).', { status: 503, code: 'MOCK_ERROR' });
  }
}

// فهرس نصي مُطبّع مسبقًا لتسريع البحث
const INDEX = FILES.map((f) => ({
  file: f,
  title: normalizeArabic(`${f.title} ${f.subject} ${f.fileNumber}`),
  full: normalizeArabic(`${f.title} ${f.subject} ${f.fileNumber} ${f.content} ${f.source}`),
}));

function matches(text, query, mode) {
  if (!query) return true;
  const q = normalizeArabic(query);
  if (mode === 'exact') return text.includes(q);
  const words = tokenize(q);
  if (!words.length) return true;
  return mode === 'any' ? words.some((w) => text.includes(w)) : words.every((w) => text.includes(w));
}

function score(entry, query) {
  if (!query) return 0;
  const words = tokenize(normalizeArabic(query));
  return words.reduce((acc, w) => acc + (entry.title.includes(w) ? 3 : 0) + (entry.full.includes(w) ? 1 : 0), 0);
}

function sortResults(list, sortBy, query) {
  const sorted = [...list];
  if (sortBy === 'newest') sorted.sort((a, b) => b.file.date.localeCompare(a.file.date));
  else if (sortBy === 'oldest') sorted.sort((a, b) => a.file.date.localeCompare(b.file.date));
  else sorted.sort((a, b) => score(b, query) - score(a, query) || b.file.date.localeCompare(a.file.date));
  return sorted;
}

function paginate(list, page = 1, pageSize = config.defaultPageSize) {
  const size = Math.min(Math.max(Number(pageSize) || 10, 1), 100);
  const totalCount = list.length;
  const totalPages = Math.max(Math.ceil(totalCount / size), 1);
  const current = Math.min(Math.max(Number(page) || 1, 1), totalPages);
  const start = (current - 1) * size;
  return {
    items: list.slice(start, start + size).map(({ file }) => {
      const { content: _content, ...rest } = file; // القائمة لا تحتاج النص الكامل
      return rest;
    }),
    totalCount,
    page: current,
    pageSize: size,
    totalPages,
  };
}

const countsByDb = FILES.reduce((acc, f) => ({ ...acc, [f.databaseId]: (acc[f.databaseId] || 0) + 1 }), {});

export const mockServer = {
  async getDatabases({ signal } = {}) {
    await simulateNetwork(signal);
    return DATABASES.map((d) => ({ ...d, count: countsByDb[d.id] || 0 }));
  },

  async getSearchFilters({ signal } = {}) {
    await simulateNetwork(signal);
    const years = FILES.map((f) => f.year);
    return {
      sources: SOURCES,
      fileTypes: FILE_TYPES,
      yearRange: { min: Math.min(...years), max: Math.max(...years) },
    };
  },

  async simpleSearch({ query = '', databaseIds = [], page, pageSize }, { signal } = {}) {
    const started = performance.now();
    await simulateNetwork(signal);
    if (!databaseIds.length) {
      throw new ApiError('يرجى اختيار قاعدة بيانات واحدة على الأقل.', { status: 400, code: 'VALIDATION' });
    }
    const dbSet = new Set(databaseIds);
    const filtered = INDEX.filter((e) => dbSet.has(e.file.databaseId) && matches(e.full, query, 'all'));
    return {
      ...paginate(sortResults(filtered, 'relevance', query), page, pageSize),
      tookMs: Math.round(performance.now() - started),
    };
  },

  async advancedSearch(criteria, { signal } = {}) {
    const started = performance.now();
    await simulateNetwork(signal);
    const {
      keyword = '', matchMode = 'all', fullText = true, databaseId = '', source = '',
      fileType = '', fileNumber = '', fromYear, toYear, sortBy = 'relevance', page, pageSize,
    } = criteria;

    if (fromYear && toYear && Number(fromYear) > Number(toYear)) {
      throw new ApiError('سنة البداية يجب أن تكون أقل من أو تساوي سنة النهاية.', { status: 400, code: 'VALIDATION' });
    }

    const fileNo = normalizeArabic(fileNumber);
    const filtered = INDEX.filter(({ file, title, full }) =>
      (!databaseId || file.databaseId === databaseId) &&
      (!source || file.source === source) &&
      (!fileType || file.fileType === fileType) &&
      (!fileNo || normalizeArabic(file.fileNumber).includes(fileNo)) &&
      (!fromYear || file.year >= Number(fromYear)) &&
      (!toYear || file.year <= Number(toYear)) &&
      matches(fullText ? full : title, keyword, matchMode),
    );

    return {
      ...paginate(sortResults(filtered, sortBy, keyword), page, pageSize),
      tookMs: Math.round(performance.now() - started),
    };
  },

  async getFileById(id, { signal } = {}) {
    await simulateNetwork(signal);
    const file = FILES.find((f) => f.id === String(id));
    if (!file) throw new ApiError('الملف المطلوب غير موجود.', { status: 404, code: 'NOT_FOUND' });
    return file;
  },
};
