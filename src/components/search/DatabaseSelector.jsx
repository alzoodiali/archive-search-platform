import { CheckCheck, Eraser, RefreshCw, Database } from 'lucide-react';
import Chip from '../common/Chip';
import Button from '../common/Button';
import StateView from '../common/StateView';
import { formatNumber } from '../../utils/format';
import styles from './DatabaseSelector.module.css';

/** اختيار قاعدة بيانات واحدة أو أكثر (مطابق لشاشة البحث البسيط) */
export default function DatabaseSelector({ databases, status, error, selected, onChange, onRetry, validationError }) {
  const selectedSet = new Set(selected);
  const toggle = (id) => onChange(selectedSet.has(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  const allSelected = databases?.length > 0 && selected.length === databases.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3 className={styles.title} id="db-selector-title">
          <Database size={18} aria-hidden="true" />
          الرجاء اختيار واحدة أو أكثر من قواعد البيانات
        </h3>
        {status === 'success' && (
          <div className={styles.actions}>
            <span className={styles.counter} aria-live="polite">
              المحدد: {formatNumber(selected.length)} / {formatNumber(databases.length)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              icon={allSelected ? Eraser : CheckCheck}
              onClick={() => onChange(allSelected ? [] : databases.map((d) => d.id))}
              id="btn-toggle-all-dbs"
            >
              {allSelected ? 'إلغاء الكل' : 'تحديد الكل'}
            </Button>
          </div>
        )}
      </div>

      {status === 'loading' && (
        <div className={styles.chips} aria-busy="true" aria-label="جاري تحميل قواعد البيانات">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={styles.skeleton} style={{ width: `${90 + ((i * 37) % 70)}px` }} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <StateView
          compact
          variant={error?.code === 'NETWORK' ? 'network' : 'error'}
          title="تعذّر تحميل قواعد البيانات"
          description={error?.message}
          action={{ label: 'إعادة المحاولة', icon: RefreshCw, onClick: onRetry }}
        />
      )}

      {status === 'success' &&
        (databases.length ? (
          <div className={styles.chips} role="group" aria-labelledby="db-selector-title">
            {databases.map((db) => (
              <Chip
                key={db.id}
                id={`db-chip-${db.id}`}
                selected={selectedSet.has(db.id)}
                onToggle={() => toggle(db.id)}
                count={db.count != null ? formatNumber(db.count) : undefined}
              >
                {db.name}
              </Chip>
            ))}
          </div>
        ) : (
          <StateView compact variant="empty" title="لا توجد قواعد بيانات متاحة حاليًا" />
        ))}

      {validationError && (
        <p className={styles.error} role="alert">
          {validationError}
        </p>
      )}
    </div>
  );
}
