import FieldWrapper, { describedBy } from './FieldWrapper';
import styles from './Field.module.css';

/**
 * @param {{value: string, label: string}[]} options
 * @param {string} placeholder نص الخيار الفارغ (مثل "الكل")
 */
export default function SelectField({
  id,
  label,
  optional,
  error,
  hint,
  options = [],
  placeholder,
  className,
  ...selectProps
}) {
  return (
    <FieldWrapper id={id} label={label} optional={optional} error={error} hint={hint} className={className}>
      <div className={styles.control}>
        <select
          id={id}
          className={styles.select}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint)}
          {...selectProps}
        >
          {placeholder != null && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </FieldWrapper>
  );
}
