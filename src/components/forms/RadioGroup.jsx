import styles from './Field.module.css';

export default function RadioGroup({ name, legend, options, value, onChange, disabled }) {
  return (
    <fieldset className={styles.radioGroup} disabled={disabled}>
      {legend && <legend className="visually-hidden">{legend}</legend>}
      {options.map((o) => (
        <label key={o.value} className={styles.radio}>
          <input
            type="radio"
            id={`${name}-${o.value}`}
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
          <span className={styles.radioDot} aria-hidden="true" />
          <span className={styles.radioText}>{o.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
