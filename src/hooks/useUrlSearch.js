import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAsync } from './useAsync';
import { useToast } from './useToast';

/**
 * يجعل الرابط (URL) هو مصدر الحقيقة لحالة البحث:
 * - تغيير معاملات الرابط ⇒ تنفيذ البحث تلقائيًا (يدعم زر الرجوع ومشاركة الرابط).
 * - يلغي الطلب السابق عند إرسال طلب جديد.
 *
 * @param {(params: URLSearchParams) => {active: boolean}} parse  دالة ثابتة لتحليل الرابط
 * @param {(state, opts) => Promise} request دالة ثابتة لتنفيذ الطلب
 */
export function useUrlSearch(parse, request) {
  const [params, setParams] = useSearchParams();
  const paramsKey = params.toString();
  const urlState = useMemo(() => parse(params), [parse, params]);
  const search = useAsync(request);
  const toast = useToast();
  const { run, reset } = search;

  const execute = useCallback(
    async (state) => {
      const res = await run(state);
      if (res.error) toast.error(res.error.message, { title: 'فشل البحث' });
    },
    [run, toast],
  );

  useEffect(() => {
    if (urlState.active) execute(urlState);
    else reset();
  }, [urlState, execute, reset]);

  const retry = useCallback(() => execute(urlState), [execute, urlState]);

  return { params, paramsKey, setParams, urlState, search, retry };
}
