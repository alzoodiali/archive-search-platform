import { NavLink, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, FolderSearch } from 'lucide-react';
import styles from './Header.module.css';

const NAV = [
  { to: '/', label: 'بحث بسيط', icon: Search, end: true },
  { to: '/advanced', label: 'بحث متقدم', icon: SlidersHorizontal },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="الصفحة الرئيسية — منصة البحث في الملفات">
          <span className={styles.logo} aria-hidden="true">
            <FolderSearch size={20} />
          </span>
          <span className={styles.brandText}>
            <strong>منصة البحث</strong>
            <small>في الملفات وقواعد البيانات</small>
          </span>
        </Link>

        <nav aria-label="التنقل الرئيسي">
          <ul className={styles.nav}>
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  id={`nav-${to === '/' ? 'simple' : 'advanced'}`}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
