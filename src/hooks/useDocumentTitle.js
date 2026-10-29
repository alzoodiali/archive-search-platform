import { useEffect } from 'react';

const APP_NAME = 'منصة البحث في الملفات';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [title]);
}
