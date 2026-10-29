import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Eraser, SearchCheck } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import SectionRibbon from '../components/common/SectionRibbon';
import TextField from '../components/forms/TextField';
import DatabaseSelector from '../components/search/DatabaseSelector';
import ResultsPanel from '../components/search/ResultsPanel';
import { useDatabases } from '../hooks/useSearchData';
import { useUrlSearch } from '../hooks/useUrlSearch';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { searchService } from '../services/searchService';
import { validateSimpleSearch, hasErrors, LIMITS } from '../utils/validators';
import { parseSimpleParams, buildSimpleParams } from '../utils/searchParams';
import styles from './SearchPage.module.css';

const request = ({ query, databaseIds, page, pageSize }, opts) =>
  searchService.simpleSearch({ query: query.trim(), databaseIds, page, pageSize }, opts);

export default function SimpleSearchPage() {
  useDocumentTitle('بحث بسيط');
  const location = useLocation();
  const toast = useToast();
  const resultsRef = useRef(null);
  const databases = useDatabases();
  const { paramsKey, setParams, urlState, search, retry } = useUrlSearch(parseSimpleParams, request);

  // حالة النموذج المحلية — تُزامَن مع الرابط عند التنقل (رجوع/تقدم)
  const [query, setQuery] = useState(urlState.query);
  const [databaseIds, setDatabaseIds] = useState(urlState.databaseIds);
  const [errors, setErrors] = useState({});
  const [syncedKey, setSyncedKey] = useState(paramsKey);
  if (syncedKey !== paramsKey) {
    setSyncedKey(paramsKey);
    setQuery(urlState.query);
    setDatabaseIds(urlState.databaseIds);
    setErrors({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateSimpleSearch({ query, databaseIds });
    setErrors(validation);
    if (hasErrors(validation)) {
      toast.warning('يرجى تصحيح الحقول المطلوبة قبل البحث.');
      return;
    }
    const next = buildSimpleParams({ query, databaseIds, page: 1, pageSize: urlState.pageSize });
    // إذا كانت المعايير نفسها، أعد تنفيذ البحث يدويًا
    if (new URLSearchParams(next).toString() === paramsKey) retry();
    else setParams(next);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClear = () => {
    setQuery('');
    setDatabaseIds([]);
    setErrors({});
    setParams({});
    toast.info('تم مسح معايير البحث.');
  };

  const updateParams = (patch) =>
    setParams(buildSimpleParams({ ...urlState, ...patch }));

  const isSearching = search.isLoading;

  return (
    <div className={styles.page}>
      <header className={`${styles.hero} fade-up`}>
        <h1>
          ابحث في <span>الملفات وقواعد البيانات</span>
        </h1>
        <p>اختر قاعدة بيانات أو أكثر، ثم اكتب كلمة أو عبارة للبحث في العناوين والمحتوى.</p>
      </header>

      <Card aria-labelledby="simple-search-title">
        <div className={styles.card}>
          <SectionRibbon icon={Search} id="simple-search-title">
            بحث بسيط
          </SectionRibbon>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <DatabaseSelector
              databases={databases.data || []}
              status={databases.status}
              error={databases.error}
              selected={databaseIds}
              onChange={(ids) => {
                setDatabaseIds(ids);
                if (errors.databaseIds && ids.length) setErrors(({ databaseIds: _d, ...rest }) => rest);
              }}
              onRetry={() => databases.run()}
              validationError={errors.databaseIds}
            />

            <hr className={styles.divider} />

            <div className={styles.searchRow}>
              <TextField
                id="simple-query"
                label="كلمة البحث"
                type="search"
                icon={Search}
                clearable
                placeholder="اكتب كلمة أو عبارة… مثال: العقود التجارية"
                value={query}
                maxLength={LIMITS.queryMax}
                autoComplete="off"
                enterKeyHint="search"
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (errors.query) setErrors(({ query: _q, ...rest }) => rest);
                }}
                onClear={() => setQuery('')}
                error={errors.query}
                hint="يتم البحث في عنوان الملف ورقمه ومحتواه، مع تجاهل التشكيل واختلاف الهمزات."
              />
            </div>

            <div className={styles.actions}>
              <Button type="submit" icon={SearchCheck} loading={isSearching} id="btn-simple-search">
                شروع البحث
              </Button>
              <Button variant="secondary" icon={Eraser} onClick={handleClear} disabled={isSearching} id="btn-simple-clear">
                مسح
              </Button>
            </div>
          </form>
        </div>
      </Card>

      <div ref={resultsRef}>
        <ResultsPanel
          status={search.status}
          data={search.data}
          error={search.error}
          query={urlState.query}
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
