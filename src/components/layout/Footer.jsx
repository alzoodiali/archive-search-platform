import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>© {new Date().getFullYear()} منصة البحث في الملفات</span>
        <span className={styles.muted}>جميع الحقوق محفوظة</span>
      </div>
    </footer>
  );
}
