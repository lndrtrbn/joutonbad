import { useEffect, useRef } from "react";

/**
 * Hook to detect click outside a DOM element.
 *
 * @param callback The function to call on click.
 * @returns The ref to link to the DOM element.
 */
export default function useClickOutside(callback: (e: MouseEvent) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        savedCallback.current(event);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
}
