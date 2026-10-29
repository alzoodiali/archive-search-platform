import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { formatNumber } from '../../utils/format';
import styles from './Pagination.module.css';

/** يبني قائمة أرقام الصفحات مع فواصل "…" */
function buildPages(page, totalPages) {
  const delta = 1;
  const pages = [];
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || (p >= page - delta && p <= page + delta)) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return pages;
}

export default function Pagination({ page, totalPages, onChange, disabled }) {
  if (!totalPages || totalPages <= 1) return null;
  const go = (p) => !disabled && p >= 1 && p <= totalPages && p !== page && onChange(p);

  // في RTL: "السابق" يشير لليمين و"التالي" لليسار
  return (
    <nav className={styles.pagination} aria-label="ترقيم صفحات النتائج">
      <button type="button" className={styles.nav} onClick={() => go(1)} disabled={disabled || page === 1} aria-label="الصفحة الأولى">
        <ChevronsRight size={16} />
      </button>
      <button type="button" className={styles.nav} onClick={() => go(page - 1)} disabled={disabled || page === 1} aria-label="الصفحة السابقة">
        <ChevronRight size={16} />
      </button>

      <ul className={styles.pages}>
        {buildPages(page, totalPages).map((p, i) =>
          p === '…' ? (
            <li key={`gap-${i}`} className={styles.gap} aria-hidden="true">…</li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`${styles.page} ${p === page ? styles.active : ''}`}
                onClick={() => go(p)}
                disabled={disabled}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`الصفحة ${p}`}
              >
                {formatNumber(p)}
              </button>
            </li>
          ),
        )}
      </ul>

      <button type="button" className={styles.nav} onClick={() => go(page + 1)} disabled={disabled || page === totalPages} aria-label="الصفحة التالية">
        <ChevronLeft size={16} />
      </button>
      <button type="button" className={styles.nav} onClick={() => go(totalPages)} disabled={disabled || page === totalPages} aria-label="الصفحة الأخيرة">
        <ChevronsLeft size={16} />
      </button>
    </nav>
  );
}
