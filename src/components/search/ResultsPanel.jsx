import { RefreshCw, Timer, ListFilter, Eraser } from 'lucide-react';
import ResultsTable from './ResultsTable';
import Pagination from '../common/Pagination';
import StateView from '../common/StateView';
import { config } from '../../services/config';
import { formatNumber, formatRange } from '../../utils/format';
import styles from './ResultsPanel.module.css';

/**
 * لوحة النتائج المشتركة بين البحث البسيط والمتقدم:
 * ملخص العدد + اختيار حجم الصفحة + الجدول + الترقيم + كل الحالات.
 */
export default function ResultsPanel({
  status, // idle | loading | success | error
  data,
  error,
  query,
  onRetry,
  onReset,
  onPageChange,
  onPageSizeChange,
  pageSize,
  fromState,
}) {
  const isLoading = status === 'loading';
  const items = status === 'success' ? data?.items || [] : [];

  let emptySlot = null;
  if (status === 'idle') {
    emptySlot = (
      <StateView
        variant="idle"
        title="لا توجد بيانات"
        description="حدد معايير البحث ثم اضغط زر البحث لعرض النتائج هنا."
      />
    );
  } else if (status === 'error') {
    emptySlot = (
      <StateView
        variant={error?.code === 'NETWORK' ? 'network' : 'error'}
        title="تعذّر إتمام عملية البحث"
        description={error?.message}
        action={{ label: 'إعادة المحاولة', icon: RefreshCw, onClick: onRetry }}
      />
    );
  } else if (status === 'success' && !items.length) {
    emptySlot = (
      <StateView
        variant="empty"
        title="لا توجد نتائج مطابقة"
        description="جرّب كلمات أخرى، أو قلّل الفلاتر، أو اختر قواعد بيانات إضافية."
        action={onReset ? { label: 'مسح الفلاتر', icon: Eraser, onClick: onReset } : undefined}
      />
    );
  }

  return (
    <section className={styles.panel} aria-labelledby="results-heading">
      <div className={styles.bar}>
        <div className={styles.summary}>
          <h2 id="results-heading" className={styles.heading}>
            <ListFilter size={18} aria-hidden="true" />
            نتائج البحث
            {status === 'success' && <span className={styles.total}>{formatNumber(data?.totalCount ?? 0)}</span>}
          </h2>
          <p className={styles.meta} aria-live="polite">
            {isLoading && 'جاري البحث…'}
            {status === 'success' && formatRange(data)}
            {status === 'success' && data?.tookMs != null && (
              <span className={styles.took}>
                <Timer size={13} aria-hidden="true" />
                {formatNumber((data.tookMs / 1000).toFixed(2))} ثانية
              </span>
            )}
          </p>
        </div>

        {status === 'success' && data?.totalCount > 0 && (
          <label className={styles.pageSize}>
            <span>عدد النتائج في الصفحة</span>
            <select
              id="select-page-size"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {config.pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {formatNumber(n)}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <ResultsTable items={items} query={query} loading={isLoading} emptySlot={emptySlot} fromState={fromState} />

      {status === 'success' && (
        <div className={styles.footer}>
          <Pagination page={data.page} totalPages={data.totalPages} onChange={onPageChange} disabled={isLoading} />
        </div>
      )}
    </section>
  );
}
