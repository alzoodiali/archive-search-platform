import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Highlight from '../common/Highlight';
import { formatDate } from '../../utils/format';
import styles from './ResultsTable.module.css';

const COLUMNS = ['رقم الملف', 'عنوان الملف', 'قاعدة البيانات', 'المصدر', 'النوع', 'التاريخ', 'عرض'];

function SkeletonRows({ rows = 6 }) {
  return Array.from({ length: rows }, (_, r) => (
    <tr key={r} className={styles.skeletonRow} aria-hidden="true">
      {COLUMNS.map((c, i) => (
        <td key={c} data-label={c}>
          <span className={styles.skeleton} style={{ width: i === 1 ? '85%' : '60%' }} />
        </td>
      ))}
    </tr>
  ));
}

/** جدول النتائج — يتحول إلى بطاقات على الشاشات الصغيرة */
export default function ResultsTable({ items = [], query, loading, emptySlot, fromState }) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table} aria-busy={loading || undefined}>
        <caption className="visually-hidden">نتائج البحث</caption>
        <thead>
          <tr>
            {COLUMNS.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows />
          ) : items.length ? (
            items.map((f, idx) => (
              <tr key={f.id} className={styles.row} style={{ animationDelay: `${idx * 30}ms` }}>
                <td data-label="رقم الملف">
                  <span className={styles.fileNo}>{f.fileNumber}</span>
                </td>
                <td data-label="عنوان الملف" className={styles.titleCell}>
                  <Link to={`/files/${f.id}`} state={fromState} className={styles.title}>
                    <Highlight text={f.title} query={query} />
                  </Link>
                  {f.summary && (
                    <p className={styles.summary}>
                      <Highlight text={f.summary} query={query} />
                    </p>
                  )}
                </td>
                <td data-label="قاعدة البيانات">
                  <span className={styles.badge}>{f.databaseName}</span>
                </td>
                <td data-label="المصدر">{f.source}</td>
                <td data-label="النوع">{f.fileType}</td>
                <td data-label="التاريخ" className={styles.nowrap}>
                  {formatDate(f.date)}
                </td>
                <td data-label="عرض">
                  <Link
                    to={`/files/${f.id}`}
                    state={fromState}
                    className={styles.view}
                    aria-label={`عرض الملف ${f.fileNumber}`}
                    id={`view-file-${f.id}`}
                  >
                    <Eye size={16} aria-hidden="true" />
                    <span>عرض</span>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className={styles.emptyRow}>
              <td colSpan={COLUMNS.length}>{emptySlot}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
