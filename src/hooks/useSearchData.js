import { useAsync } from './useAsync';
import { searchService } from '../services/searchService';

const fetchDatabases = (_args, opts) => searchService.getDatabases(opts);
const fetchFilters = (_args, opts) => searchService.getSearchFilters(opts);
const fetchFile = (id, opts) => searchService.getFileById(id, opts);

/** قائمة قواعد البيانات المتاحة للبحث */
export const useDatabases = () => useAsync(fetchDatabases, { immediate: true });

/** خيارات فلاتر البحث المتقدم (المصادر، الأنواع، نطاق السنوات) */
export const useSearchFilters = () => useAsync(fetchFilters, { immediate: true });

/** تفاصيل ملف واحد */
export const useFileDetails = (id) => useAsync(fetchFile, { immediate: true, initialArgs: id });
