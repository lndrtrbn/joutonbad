import { useCallback, useEffect, useRef, useState } from "react";

type UseFetch<T> = [T | undefined, () => Promise<unknown>];

export default function useFetch<T>(
  request: () => Promise<T>,
): UseFetch<T> {
  const fetchingRef = useRef(false);
  const fetchedRef = useRef(false);
  const [data, setData] = useState<T>();

  const fetch = useCallback(async () => {
    async function getData() {
      const res = await request();
      setData(res);
      fetchedRef.current = true;
      fetchingRef.current = false;
    }
    if (!fetchedRef.current && !fetchingRef.current) {
      fetchingRef.current = true;
      await getData();
    }
  }, [request]);

  const refetch = useCallback(async () => {
    fetchingRef.current = false;
    fetchedRef.current = false;
    await fetch();
  }, [fetch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [data, refetch];
}
