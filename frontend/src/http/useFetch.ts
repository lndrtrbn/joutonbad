import { useCallback, useEffect, useRef, useState } from "react";

type UseFetch<T> = [T | undefined, () => void];

export default function useFetch<T>(
  request: () => Promise<T>,
): UseFetch<T> {
  const fetchingRef = useRef(false);
  const fetchedRef = useRef(false);
  const [data, setData] = useState<T>();

  const fetch = useCallback(() => {
    async function getData() {
      const res = await request();
      setData(res);
      fetchedRef.current = true;
      fetchingRef.current = false;
    }
    if (!fetchedRef.current && !fetchingRef.current) {
      fetchingRef.current = true;
      getData();
    }
  }, [request]);

  const refetch = useCallback(() => {
    fetchingRef.current = false;
    fetchedRef.current = false;
    fetch();
  }, [fetch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [data, refetch];
}
