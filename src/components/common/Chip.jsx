import { Check } from 'lucide-react';
import styles from './Chip.module.css';

/** شريحة قابلة للاختيار (Toggle chip) */
export default function Chip({ selected = false, onToggle, children, count, disabled, id }) {
  return (
    <button
      type="button"
      id={id}
      className={`${styles.chip} ${selected ? styles.selected : ''}`}
      aria-pressed={selected}
      onClick={onToggle}
      disabled={disabled}
    >
      <span className={styles.check} aria-hidden="true">
        <Check size={12} strokeWidth={3} />
      </span>
      <span className={styles.label}>{children}</span>
      {count != null && <span className={styles.count}>{count}</span>}
    </button>
  );
}
