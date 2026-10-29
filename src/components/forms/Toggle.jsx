import styles from './Field.module.css';

export default function Toggle({ id, label, checked, onChange, disabled }) {
  return (
    <label className={styles.toggle} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-checked={checked}
      />
      <span className={styles.track} aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}
