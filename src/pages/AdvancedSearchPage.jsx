import { useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SlidersHorizontal, Search, Eraser, Hash, CalendarRange, AlertCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import SectionRibbon from '../components/common/SectionRibbon';
import TextField from '../components/forms/TextField';
import SelectField from '../components/forms/SelectField';
import RadioGroup from '../components/forms/RadioGroup';
import Toggle from '../components/forms/Toggle';
import ResultsPanel from '../components/search/ResultsPanel';
import { useDatabases, useSearchFilters } from '../hooks/useSearchData';
import { useUrlSearch } from '../hooks/useUrlSearch';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { searchService } from '../services/searchService';
import { validateAdvancedSearch, hasErrors, LIMITS } from '../utils/validators';
import {
  ADVANCED_DEFAULTS,
  parseAdvancedParams,
  buildAdvancedParams,
  toAdvancedPayload,
} from '../utils/searchParams';
import styles from './SearchPage.module.css';

const MATCH_OPTIONS = [
  { value: 'all', label: 'جميع الكلمات' },
  { value: 'any', label: 'أي كلمة' },
  { value: 'exact', label: 'العبارة كما هي' },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'الأكثر صلة' },
  { value: 'newest', label: 'الأحدث أولًا' },
  { value: 'oldest', label: 'الأقدم أولًا' },
];

const request = ({ values, page, pageSize }, opts) =>
  searchService.advancedSearch(toAdvancedPayload(values, page, pageSize), opts);

const toOptions = (list = []) => list.map((v) => ({ value: v, label: v }));

export default function AdvancedSearchPage() {
  useDocumentTitle('بحث متقدم');
  const location = useLocation();
  const toast = useToast();
  const resultsRef = useRef(null);
  const databases = useDatabases();
  const filters = useSearchFilters();
  const { paramsKey, setParams, urlState, search, retry } = useUrlSearch(parseAdvancedParams, request);

  const [values, setValues] = useState(urlState.values);
  const [errors, setErrors] = useState({});
  const [syncedKey, setSyncedKey] = useState(paramsKey);
  if (syncedKey !== paramsKey) {
    setSyncedKey(paramsKey);
    setValues(urlState.values);
    setErrors({});
  }

  const yearRange = filters.data?.yearRange;
  const yearOptions = useMemo(() => {
    if (!yearRange) return [];
    const list = [];
    for (let y = yearRange.max; y >= yearRange.min; y -= 1) list.push({ value: String(y), label: String(y) });
    return list;
  }, [yearRange]);

  const dbOptions = (databases.data || []).map((d) => ({ value: d.id, label: d.name }));
  const optionsLoading = databases.isLoading || filters.isLoading;
  const optionsFailed = databases.isError || filters.isError;

  const setField = (name) => (eOrValue) => {
    const value = eOrValue?.target ? eOrValue.target.value : eOrValue;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors(({ [name]: _x, form: _f, ...rest }) => rest);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateAdvancedSearch(values, yearRange);
    setErrors(validation);
    if (hasErrors(validation)) {
      toast.warning(validation.form || 'يرجى تصحيح الحقول المحددة قبل البحث.');
      return;
    }
    const next = buildAdvancedParams(values, { page: 1, pageSize: urlState.pageSize });
    if (new URLSearchParams(next).toString() === paramsKey) retry();
    else setParams(next);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClear = () => {
    setValues(ADVANCED_DEFAULTS);
    setErrors({});
    setParams({});
    toast.info('تم مسح جميع الفلاتر.');
  };

  const updateParams = (patch) =>
    setParams(buildAdvancedParams(urlState.values, { page: urlState.page, pageSize: urlState.pageSize, ...patch }));

  const retryOptions = () => {
    if (databases.isError) databases.run();
    if (filters.isError) filters.run();
  };

  const isSearching = search.isLoading;

  return (
    <div className={styles.page}>
      <header className={`${styles.hero} fade-up`}>
        <h1>
          بحث <span>متقدم ودقيق</span>
        </h1>
        <p>اجمع بين الكلمات المفتاحية وقاعدة البيانات والمصدر ونوع الملف ونطاق السنوات للوصول إلى نتائج أدق.</p>
      </header>

      <Card aria-labelledby="advanced-search-title">
        <div className={styles.card}>
          <SectionRibbon icon={SlidersHorizontal} id="advanced-search-title">
            بحث متقدم
          </SectionRibbon>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {optionsFailed && (
              <div className={styles.formError} role="alert">
                <AlertCircle size={16} aria-hidden="true" />
                <span style={{ flex: 1 }}>تعذّر تحميل بعض خيارات الفلاتر. يمكنك المتابعة أو إعادة المحاولة.</span>
                <Button size="sm" variant="secondary" onClick={retryOptions} id="btn-retry-filters">
                  إعادة المحاولة
                </Button>
              </div>
            )}

            <div className={styles.grid}>
              <TextField
                id="adv-keyword"
                className={styles.span2}
                label="الكلمات المفتاحية"
                type="search"
                icon={Search}
                clearable
                placeholder="اكتب كلمة أو عبارة للبحث"
                value={values.keyword}
                maxLength={LIMITS.queryMax}
                autoComplete="off"
                onChange={setField('keyword')}
                onClear={() => setField('keyword')('')}
                error={errors.keyword}
              />
              <SelectField
                id="adv-database"
                label="قاعدة البيانات"
                placeholder={databases.isLoading ? 'جاري التحميل…' : 'جميع قواعد البيانات'}
                options={dbOptions}
                value={values.databaseId}
                onChange={setField('databaseId')}
                disabled={databases.isLoading}
              />
              <SelectField
                id="adv-source"
                label="المصدر"
                placeholder={filters.isLoading ? 'جاري التحميل…' : 'جميع المصادر'}
                options={toOptions(filters.data?.sources)}
                value={values.source}
                onChange={setField('source')}
                disabled={filters.isLoading}
              />

              <SelectField
                id="adv-type"
                label="نوع الملف"
                placeholder={filters.isLoading ? 'جاري التحميل…' : 'جميع الأنواع'}
                options={toOptions(filters.data?.fileTypes)}
                value={values.fileType}
                onChange={setField('fileType')}
                disabled={filters.isLoading}
              />
              <TextField
                id="adv-file-number"
                label="رقم الملف"
                icon={Hash}
                placeholder="مثال: 2015/245"
                value={values.fileNumber}
                maxLength={LIMITS.fileNumberMax}
                autoComplete="off"
                dir="ltr"
                style={{ textAlign: 'right' }}
                onChange={setField('fileNumber')}
                error={errors.fileNumber}
              />
              <SelectField
                id="adv-from-year"
                label="من سنة"
                placeholder="—"
                options={yearOptions}
                value={values.fromYear}
                onChange={setField('fromYear')}
                error={errors.fromYear}
                disabled={filters.isLoading}
              />
              <SelectField
                id="adv-to-year"
                label="إلى سنة"
                placeholder="—"
                options={yearOptions}
                value={values.toYear}
                onChange={setField('toYear')}
                error={errors.toYear}
                disabled={filters.isLoading}
              />
            </div>

            <div className={styles.optionsRow}>
              <div className={styles.optionGroup}>
                <span className={styles.optionLabel}>طريقة المطابقة:</span>
                <RadioGroup
                  name="matchMode"
                  legend="طريقة مطابقة الكلمات"
                  options={MATCH_OPTIONS}
                  value={values.matchMode}
                  onChange={setField('matchMode')}
                />
              </div>
              <div className={styles.optionGroup}>
                <Toggle
                  id="adv-fulltext"
                  label="البحث في النص الكامل"
                  checked={values.fullText}
                  onChange={setField('fullText')}
                />
                <SelectField
                  id="adv-sort"
                  options={SORT_OPTIONS}
                  value={values.sortBy}
                  onChange={setField('sortBy')}
                  aria-label="ترتيب النتائج"
                />
              </div>
            </div>

            {errors.form && (
              <p className={styles.formError} role="alert">
                <CalendarRange size={16} aria-hidden="true" />
                {errors.form}
              </p>
            )}

            <div className={styles.submitBar}>
              <Button
                type="submit"
                size="lg"
                icon={Search}
                loading={isSearching}
                className={styles.submitWide}
                id="btn-advanced-search"
                disabled={optionsLoading && !optionsFailed}
              >
                بحث
              </Button>
              <div className={styles.actions}>
                <Button variant="ghost" icon={Eraser} onClick={handleClear} disabled={isSearching} id="btn-advanced-clear">
                  مسح الفلاتر وإعادة البحث
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>

      <div ref={resultsRef}>
        <ResultsPanel
          status={search.status}
          data={search.data}
          error={search.error}
          query={urlState.values.keyword}
          pageSize={urlState.pageSize}
          onRetry={retry}
          onReset={handleClear}
          onPageChange={(page) => {
            updateParams({ page });
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          onPageSizeChange={(pageSize) => updateParams({ pageSize, page: 1 })}
          fromState={{ from: location.pathname + location.search }}
        />
      </div>
    </div>
  );
}
