import { config } from '../services/config';

const toInt = (v, fallback) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const pageSizeFrom = (v) => {
  const n = toInt(v, config.defaultPageSize);
  return config.pageSizeOptions.includes(n) ? n : config.defaultPageSize;
};

/** يحذف القيم الفارغة لإبقاء الرابط نظيفًا */
const clean = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v != null && v !== false));

// ===== البحث البسيط =====
export const SIMPLE_DEFAULTS = { query: '', databaseIds: [] };

export function parseSimpleParams(params) {
  const query = params.get('q') || '';
  const databaseIds = (params.get('db') || '').split(',').filter(Boolean);
  return {
    query,
    databaseIds,
    page: toInt(params.get('page'), 1),
    pageSize: pageSizeFrom(params.get('size')),
    active: Boolean(query && databaseIds.length),
  };
}

export function buildSimpleParams({ query, databaseIds, page = 1, pageSize }) {
  return clean({
    q: query.trim(),
    db: databaseIds.join(','),
    page: page > 1 ? page : '',
    size: pageSize !== config.defaultPageSize ? pageSize : '',
  });
}

// ===== البحث المتقدم =====
export const ADVANCED_DEFAULTS = {
  keyword: '',
  matchMode: 'all', // all | any | exact
  fullText: true,
  databaseId: '',
  source: '',
  fileType: '',
  fileNumber: '',
  fromYear: '',
  toYear: '',
  sortBy: 'relevance', // relevance | newest | oldest
};

const MATCH_MODES = ['all', 'any', 'exact'];
const SORTS = ['relevance', 'newest', 'oldest'];

export function parseAdvancedParams(params) {
  const values = {
    keyword: params.get('kw') || '',
    matchMode: MATCH_MODES.includes(params.get('mode')) ? params.get('mode') : 'all',
    fullText: params.get('ft') !== '0',
    databaseId: params.get('db') || '',
    source: params.get('src') || '',
    fileType: params.get('type') || '',
    fileNumber: params.get('no') || '',
    fromYear: params.get('from') || '',
    toYear: params.get('to') || '',
    sortBy: SORTS.includes(params.get('sort')) ? params.get('sort') : 'relevance',
  };
  return {
    values,
    page: toInt(params.get('page'), 1),
    pageSize: pageSizeFrom(params.get('size')),
    active: params.get('s') === '1',
  };
}

export function buildAdvancedParams(values, { page = 1, pageSize } = {}) {
  return clean({
    s: '1',
    kw: values.keyword.trim(),
    mode: values.matchMode !== 'all' ? values.matchMode : '',
    ft: values.fullText ? '' : '0',
    db: values.databaseId,
    src: values.source,
    type: values.fileType,
    no: values.fileNumber.trim(),
    from: values.fromYear,
    to: values.toYear,
    sort: values.sortBy !== 'relevance' ? values.sortBy : '',
    page: page > 1 ? page : '',
    size: pageSize !== config.defaultPageSize ? pageSize : '',
  });
}

/** يحوّل قيم النموذج إلى جسم الطلب المرسل للـ API */
export function toAdvancedPayload(values, page, pageSize) {
  return {
    ...values,
    keyword: values.keyword.trim(),
    fileNumber: values.fileNumber.trim(),
    fromYear: values.fromYear ? Number(values.fromYear) : null,
    toYear: values.toYear ? Number(values.toYear) : null,
    page,
    pageSize,
  };
}
