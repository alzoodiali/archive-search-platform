import styles from './Spinner.module.css';

export default function Spinner({ size = 24, tone = 'primary', label }) {
  return (
    <span
      className={`${styles.spinner} ${styles[tone] || ''}`}
      style={{ width: size, height: size }}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
