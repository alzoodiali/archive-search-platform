import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SimpleSearchPage from '../pages/SimpleSearchPage';
import AdvancedSearchPage from '../pages/AdvancedSearchPage';
import FileDetailsPage from '../pages/FileDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SimpleSearchPage />} />
        <Route path="advanced" element={<AdvancedSearchPage />} />
        <Route path="files/:id" element={<FileDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
