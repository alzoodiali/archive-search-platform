import { X } from 'lucide-react';
import FieldWrapper, { describedBy } from './FieldWrapper';
import styles from './Field.module.css';

export default function TextField({
  id,
  label,
  optional,
  error,
  hint,
  icon: Icon,
  clearable = false,
  value,
  onChange,
  onClear,
  className,
  ...inputProps
}) {
  const showClear = clearable && value;
  return (
    <FieldWrapper id={id} label={label} optional={optional} error={error} hint={hint} className={className}>
      <div className={`${styles.control} ${Icon ? styles.hasIcon : ''} ${clearable ? styles.hasClear : ''}`}>
        {Icon && <Icon size={18} className={styles.icon} aria-hidden="true" />}
        <input
          id={id}
          className={styles.input}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint)}
          {...inputProps}
        />
        {showClear && (
          <button type="button" className={styles.clear} onClick={onClear} aria-label="مسح الحقل">
            <X size={16} />
          </button>
        )}
      </div>
    </FieldWrapper>
  );
}
