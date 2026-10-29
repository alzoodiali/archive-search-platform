import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import styles from './ToastContext.module.css';

export const ToastContext = createContext(null);

const ICONS = { success: CheckCircle2, error: XCircle, warning: AlertTriangle, info: Info };
const DEFAULT_DURATION = 4000;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type, message, { title, duration = DEFAULT_DURATION } = {}) => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((list) => [...list.slice(-3), { id, type, message, title }]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  const api = useMemo(
    () => ({
      success: (msg, o) => show('success', msg, o),
      error: (msg, o) => show('error', msg, o),
      warning: (msg, o) => show('warning', msg, o),
      info: (msg, o) => show('info', msg, o),
      dismiss,
    }),
    [show, dismiss],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className={styles.viewport} role="region" aria-label="الإشعارات" aria-live="polite">
        {toasts.map(({ id, type, message, title }) => {
          const Icon = ICONS[type];
          return (
            <div key={id} className={`${styles.toast} ${styles[type]}`} role={type === 'error' ? 'alert' : 'status'}>
              <Icon size={20} className={styles.icon} aria-hidden="true" />
              <div className={styles.body}>
                {title && <strong className={styles.title}>{title}</strong>}
                <span>{message}</span>
              </div>
              <button type="button" className={styles.close} onClick={() => dismiss(id)} aria-label="إغلاق الإشعار">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
