import styles from './Button.module.css';
import Spinner from './Spinner';

/**
 * زر موحّد.
 * @param {'primary'|'secondary'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  block = false,
  disabled,
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const classes = [styles.btn, styles[variant], styles[size], block && styles.block, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <Spinner size={16} tone="inherit" /> : Icon && <Icon size={size === 'sm' ? 15 : 18} aria-hidden="true" />}
      {children && <span>{children}</span>}
    </button>
  );
}
