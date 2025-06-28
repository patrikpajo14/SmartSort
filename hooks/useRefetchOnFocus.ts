import {useCallback, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import type {QueryObserverResult} from '@tanstack/react-query';

type RefetchFunction<TData = unknown, TError = unknown> = () => Promise<
  QueryObserverResult<TData, TError>
>;

interface UseRefetchOnFocusOptions {
  enabled?: boolean; // Optional parameter to control enabling
}

function useRefetchOnFocus<TData = unknown, TError = unknown>(
  refetch: RefetchFunction<TData, TError>,
  options?: UseRefetchOnFocusOptions,
) {
  const {enabled = true} = options || {};
  const isFirstFocus = useRef(true); // Tracks the first focus event

  useFocusEffect(
    useCallback(() => {
      if (enabled && !isFirstFocus.current) {
        refetch();
        console.log('REFECHING');
      } else {
        isFirstFocus.current = false;
      }
    }, [enabled]),
  );
}

export default useRefetchOnFocus;
