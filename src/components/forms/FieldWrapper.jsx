import { AlertCircle } from 'lucide-react';
import styles from './Field.module.css';

/** غلاف موحد لأي حقل: عنوان + رسالة خطأ + تلميح، مع ربط aria */
export default function FieldWrapper({ id, label, optional, error, hint, className = '', children }) {
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {optional && <span className={styles.optional}>(اختياري)</span>}
        </label>
      )}
      {children}
      {error ? (
        <span id={`${id}-error`} className={styles.error} role="alert">
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </span>
      ) : (
        hint && (
          <span id={`${id}-hint`} className={styles.hint}>
            {hint}
          </span>
        )
      )}
    </div>
  );
}

export const describedBy = (id, error, hint) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);
