import { useCallback, useRef, useState } from "react";

import { APIError } from "../utils/error";

type UseLazyFetch<T, Payload> = [
  (p: Payload) => void,
  T | undefined,
  APIError | undefined,
  boolean,
  boolean
];

export default function useLazyFetch<T, Payload>(
  request: (p: Payload) => Promise<T>
): UseLazyFetch<T, Payload> {
  const fetchingRef = useRef(false);
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const [data, setData] = useState<T>();
  const [error, setError] = useState<APIError>();

  const fetch = useCallback(
    (payload: Payload) => {
      async function getData() {
        try {
          setData(await request(payload));
          setFetching(false);
          fetchingRef.current = false;
          setFetched(true);
        } catch (error) {
          error instanceof APIError && setError(error);
          setFetching(false);
          fetchingRef.current = false;
        }
      }
      if (!fetchingRef.current) {
        setFetched(false);
        setFetching(true);
        fetchingRef.current = true;
        setError(undefined);
        getData();
      }
    },
    [request]
  );

  return [fetch, data, error, fetching, fetched];
}
