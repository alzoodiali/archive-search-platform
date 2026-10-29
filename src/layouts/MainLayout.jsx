import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DemoBanner from '../components/layout/DemoBanner';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { pathname } = useLocation();

  // العودة لأعلى الصفحة عند تغيير المسار فقط (وليس عند تغيير معاملات البحث)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <a href="#main" className={styles.skip}>
        تخطَّ إلى المحتوى
      </a>
      <Header />
      <DemoBanner />
      <main id="main" className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
