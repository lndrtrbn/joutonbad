import { useCallback, useEffect, useRef } from "react";

/**
 * Hook to use timeout easily.
 *
 * Example:
 *
 * const [data, setData] = useState();
 * const [run, clear] = useTimeout(() => setData(undefined), 5000);
 *
 * function onClick() {
 *   run(); --> clear the data after 5 seconds.
 * }
 *
 * @param callback The function to call after the delay.
 * @param delay Delay in milliseconds.
 * @returns A function to run the timeout and an other to clear it.
 */
export default function useTimeout(
  callback: () => void,
  delay: number,
) {
  const timeoutRef = useRef<number>();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const run = useCallback(() => {
    timeoutRef.current = setTimeout(
      () => savedCallback.current(),
      delay,
    );
    return () => clearTimeout(timeoutRef.current);
  }, [delay]);

  const clear = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  return [run, clear];
}
