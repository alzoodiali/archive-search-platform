import { FileSearch, WifiOff, SearchX, AlertOctagon } from 'lucide-react';
import Button from './Button';
import styles from './StateView.module.css';

const PRESETS = {
  idle: { icon: FileSearch, tone: 'info' },
  empty: { icon: SearchX, tone: 'muted' },
  error: { icon: AlertOctagon, tone: 'danger' },
  network: { icon: WifiOff, tone: 'danger' },
};

/**
 * عرض موحد للحالات: البداية / لا توجد نتائج / خطأ.
 * @param {'idle'|'empty'|'error'|'network'} variant
 */
export default function StateView({ variant = 'empty', title, description, action, compact = false }) {
  const { icon: Icon, tone } = PRESETS[variant] || PRESETS.empty;
  return (
    <div
      className={`${styles.state} ${styles[tone]} ${compact ? styles.compact : ''}`}
      role={variant === 'error' || variant === 'network' ? 'alert' : 'status'}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon size={compact ? 22 : 28} />
      </span>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.desc}>{description}</p>}
      {action && (
        <Button variant={action.variant || 'secondary'} size="sm" icon={action.icon} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
