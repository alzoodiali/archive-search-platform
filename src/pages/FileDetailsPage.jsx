import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Building,
  FileText,
  Copy,
  Printer,
  Share2,
  FolderOpen,
  Hash,
  BookOpen,
  RefreshCw,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StateView from '../components/common/StateView';
import Spinner from '../components/common/Spinner';
import { useFileDetails } from '../hooks/useSearchData';
import { useToast } from '../hooks/useToast';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatDate, formatNumber } from '../utils/format';
import styles from './FileDetailsPage.module.css';

export default function FileDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { data: file, status, error, run: retry } = useFileDetails(id);

  useDocumentTitle(file?.title ? `${file.fileNumber} - ${file.title}` : 'تفاصيل الملف');

  const backTo = location.state?.from || '/';

  const copyNumber = () => {
    if (!file?.fileNumber) return;
    navigator.clipboard.writeText(file.fileNumber);
    toast.success('تم نسخ رقم الملف إلى الحافظة.');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('تم نسخ رابط الملف للمشاركة.');
  };

  const printDocument = () => {
    window.print();
  };

  if (status === 'loading') {
    return (
      <div className={styles.loadingWrap}>
        <Spinner size={36} />
        <p>جاري تحميل تفاصيل الملف…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <Card>
        <div style={{ padding: 'var(--space-8)' }}>
          <StateView
            variant={error?.code === 'NETWORK' ? 'network' : 'error'}
            title="تعذّر تحميل الملف"
            description={error?.message || 'الملف المطلوب غير موجود أو حدث خطأ أثناء الاتصال.'}
            action={{ label: 'إعادة المحاولة', icon: RefreshCw, onClick: () => retry(id) }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
            <Button variant="ghost" icon={ArrowRight} onClick={() => navigate(backTo)}>
              العودة إلى النتائج
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (!file) return null;

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="مسار التنقل">
        <Link to={backTo} className={styles.backBtn} id="btn-back-to-results">
          <ArrowRight size={16} aria-hidden="true" />
          <span>العودة إلى نتائج البحث</span>
        </Link>
        <span className={styles.crumbSep} aria-hidden="true">/</span>
        <span className={styles.currentCrumb}>ملف رقم {file.fileNumber}</span>
      </nav>

      <Card>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.metaRow}>
              <span className={styles.badge}>{file.databaseName}</span>
              <span className={styles.typeBadge}>{file.fileType}</span>
              <div className={styles.numberBadge}>
                <Hash size={14} aria-hidden="true" />
                <span>{file.fileNumber}</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={copyNumber}
                  aria-label="نسخ رقم الملف"
                  title="نسخ رقم الملف"
                >
                  <Copy size={13} />
                </button>
              </div>
            </div>

            <h1 className={styles.title}>{file.title}</h1>

            <div className={styles.infoBar}>
              <div className={styles.infoItem}>
                <Building size={16} aria-hidden="true" />
                <span>المصدر:</span>
                <strong>{file.source}</strong>
              </div>
              <div className={styles.infoItem}>
                <Calendar size={16} aria-hidden="true" />
                <span>التاريخ:</span>
                <strong>{formatDate(file.date)}</strong>
              </div>
              <div className={styles.infoItem}>
                <FileText size={16} aria-hidden="true" />
                <span>عدد الصفحات:</span>
                <strong>{formatNumber(file.pages)}</strong>
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="secondary" size="sm" icon={Printer} onClick={printDocument}>
                طباعة
              </Button>
              <Button variant="ghost" size="sm" icon={Share2} onClick={copyLink}>
                مشاركة
              </Button>
            </div>
          </header>

          <hr className={styles.divider} />

          {file.summary && (
            <section className={styles.section} aria-labelledby="summary-heading">
              <h2 id="summary-heading" className={styles.sectionHeading}>
                <BookOpen size={18} aria-hidden="true" />
                خلاصة الملف
              </h2>
              <div className={styles.summaryBox}>
                <p>{file.summary}</p>
              </div>
            </section>
          )}

          <section className={styles.section} aria-labelledby="content-heading">
            <h2 id="content-heading" className={styles.sectionHeading}>
              <FileText size={18} aria-hidden="true" />
              نص الوثيقة
            </h2>
            <div className={styles.contentBox}>
              {file.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {file.keywords && file.keywords.length > 0 && (
            <footer className={styles.footerTags}>
              <span className={styles.tagsLabel}>
                <FolderOpen size={15} aria-hidden="true" />
                الكلمات الدلالية:
              </span>
              <div className={styles.tagsList}>
                {file.keywords.map((kw, i) => (
                  <span key={i} className={styles.tag}>
                    {kw}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </div>
      </Card>
    </div>
  );
}
