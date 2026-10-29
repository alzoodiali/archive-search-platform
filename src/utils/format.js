const numberFmt = new Intl.NumberFormat('ar-EG');
const dateFmt = new Intl.DateTimeFormat('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

export const formatNumber = (n) => (n == null || Number.isNaN(Number(n)) ? '—' : numberFmt.format(n));

export function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? String(value) : dateFmt.format(d);
}

/** صياغة "عرض ١–١٠ من ٢٥٠ نتيجة" */
export function formatRange({ page, pageSize, totalCount }) {
  if (!totalCount) return 'لا توجد نتائج';
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);
  return `عرض ${formatNumber(from)}–${formatNumber(to)} من ${formatNumber(totalCount)} نتيجة`;
}
