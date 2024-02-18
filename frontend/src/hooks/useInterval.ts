import { useEffect, useRef } from "react";

/**
 * Hook to call a function regurlarly each delay.
 *
 * Example :
 *
 * useInterval(() => {
 *   ...
 * }, 5000);
 *
 * @param callback The function to call each delay.
 * @param delay Delay in milliseconds.
 */
export default function useInterval(
  callback: () => void,
  delay: number | null,
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
