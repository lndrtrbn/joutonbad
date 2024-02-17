import { useEffect, useState } from "react";

/**
 * Hook that observes the resize of the window and return it.
 *
 * @returns The width and height of the window.
 */
export function useWindowDimensions() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function update() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { width, height };
}
