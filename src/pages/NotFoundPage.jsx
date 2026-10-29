import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StateView from '../components/common/StateView';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('الصفحة غير موجودة');

  return (
    <Card>
      <div style={{ padding: 'var(--space-10) var(--space-6)' }}>
        <StateView
          variant="empty"
          title="عذرًا، الصفحة غير موجودة (404)"
          description="الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو أن الرابط غير صحيح."
        />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
          <Link to="/">
            <Button icon={Home}>الصفحة الرئيسية</Button>
          </Link>
          <Link to="/advanced">
            <Button variant="secondary" icon={Search}>
              البحث المتقدم
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
