export const LIMITS = Object.freeze({
  queryMin: 2,
  queryMax: 200,
  fileNumberMax: 30,
});

const YEAR_RE = /^\d{4}$/;

/** التحقق من نموذج البحث البسيط — يعيد كائن أخطاء (فارغ = صالح) */
export function validateSimpleSearch({ query, databaseIds }) {
  const errors = {};
  const q = (query || '').trim();
  if (!databaseIds?.length) errors.databaseIds = 'اختر قاعدة بيانات واحدة على الأقل.';
  if (!q) errors.query = 'أدخل كلمة أو عبارة للبحث.';
  else if (q.length < LIMITS.queryMin) errors.query = `يجب ألا تقل كلمة البحث عن ${LIMITS.queryMin} أحرف.`;
  else if (q.length > LIMITS.queryMax) errors.query = `يجب ألا تزيد كلمة البحث عن ${LIMITS.queryMax} حرف.`;
  return errors;
}

/** التحقق من نموذج البحث المتقدم */
export function validateAdvancedSearch(values, yearRange) {
  const errors = {};
  const keyword = (values.keyword || '').trim();
  const { fromYear, toYear } = values;

  const hasCriteria =
    keyword || values.databaseId || values.source || values.fileType ||
    (values.fileNumber || '').trim() || fromYear || toYear;
  if (!hasCriteria) errors.form = 'أدخل معيار بحث واحدًا على الأقل.';

  if (keyword && keyword.length < LIMITS.queryMin) {
    errors.keyword = `يجب ألا تقل كلمة البحث عن ${LIMITS.queryMin} أحرف.`;
  } else if (keyword.length > LIMITS.queryMax) {
    errors.keyword = `يجب ألا تزيد كلمة البحث عن ${LIMITS.queryMax} حرف.`;
  }

  if ((values.fileNumber || '').length > LIMITS.fileNumberMax) {
    errors.fileNumber = 'رقم الملف طويل جدًا.';
  }

  const checkYear = (key, val) => {
    if (!val) return;
    if (!YEAR_RE.test(String(val))) errors[key] = 'أدخل سنة صحيحة من 4 أرقام.';
    else if (yearRange && (val < yearRange.min || val > yearRange.max)) {
      errors[key] = `السنة يجب أن تكون بين ${yearRange.min} و ${yearRange.max}.`;
    }
  };
  checkYear('fromYear', fromYear);
  checkYear('toYear', toYear);

  if (!errors.fromYear && !errors.toYear && fromYear && toYear && Number(fromYear) > Number(toYear)) {
    errors.toYear = 'سنة النهاية يجب أن تكون بعد سنة البداية.';
  }
  return errors;
}

export const hasErrors = (errors) => Object.keys(errors).length > 0;
