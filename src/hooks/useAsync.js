import { useCallback, useEffect, useRef, useState } from 'react';
import { normalizeError } from '../services/api';

/**
 * خطاف عام لتنفيذ طلب غير متزامن مع: حالة تحميل، خطأ، بيانات، وإلغاء تلقائي
 * للطلب السابق عند إرسال طلب جديد أو عند إزالة المكون.
 *
 * @param {(args: any, opts: {signal: AbortSignal}) => Promise<any>} asyncFn
 * @param {{ immediate?: boolean, initialArgs?: any }} options
 */
export function useAsync(asyncFn, { immediate = false, initialArgs } = {}) {
  const [state, setState] = useState({
    data: null,
    error: null,
    status: immediate ? 'loading' : 'idle', // idle | loading | success | error
  });
  const controllerRef = useRef(null);
  const fnRef = useRef(asyncFn);

  useEffect(() => {
    fnRef.current = asyncFn;
  }, [asyncFn]);

  const run = useCallback(async (args) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState((s) => ({ ...s, status: 'loading', error: null }));

    try {
      const data = await fnRef.current(args, { signal: controller.signal });
      if (!controller.signal.aborted) setState({ data, error: null, status: 'success' });
      return { data };
    } catch (err) {
      const error = normalizeError(err);
      if (error.code === 'CANCELED' || controller.signal.aborted) return { canceled: true };
      setState((s) => ({ ...s, error, status: 'error' }));
      return { error };
    }
  }, []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setState({ data: null, error: null, status: 'idle' });
  }, []);

  useEffect(() => {
    if (immediate) run(initialArgs);
    return () => controllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    run,
    reset,
  };
}
