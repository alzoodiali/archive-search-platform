import { FlaskConical } from 'lucide-react';
import { isDemoMode } from '../../services/searchService';
import styles from './DemoBanner.module.css';

/** شريط واضح يُعلم العميل بأن البيانات تجريبية (يظهر فقط في وضع Demo) */
export default function DemoBanner() {
  if (!isDemoMode) return null;
  return (
    <div className={styles.banner} role="note">
      <div className={`container ${styles.inner}`}>
        <FlaskConical size={16} aria-hidden="true" />
        <span>
          <strong>نسخة عرض تجريبية:</strong> جميع النتائج المعروضة بيانات تجريبية لأغراض العرض فقط، ولم يتم
          الربط بالـ Backend بعد.
        </span>
      </div>
    </div>
  );
}
