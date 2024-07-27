import { useEffect, useState, FC, SVGProps, createContext, useContext } from "react";

import { ContextData, ProviderProps } from "./context.type";

// List of svg file names without file extension.
const SVG_NAMES = ["logo"] as const;
export type SvgNames = (typeof SVG_NAMES)[number];

type Svg = {
  [key in SvgNames]: FC<SVGProps<SVGElement>>;
};

type Context = ContextData<Svg | undefined>;
const SvgContext = createContext<Context | undefined>(undefined);

export function SvgProvider({ children }: ProviderProps) {
  const svgState = useState<Svg | undefined>();
  const [svgs, setSvgs] = svgState;

  useEffect(() => {
    const importSvgIcon = async () => {
      const loadedSvgs = await Promise.all(
        SVG_NAMES.map(async (name) => {
          return [
            name,
            (await import(`../assets/svg/${name}.svg`)).ReactComponent as FC<
              SVGProps<SVGElement>
            >,
          ] as const;
        }),
      );
      setSvgs(
        loadedSvgs.reduce(
          (acc, [name, svg]) => ({
            ...acc,
            [name]: svg,
          }),
          {},
        ) as Svg,
      );
    };
    importSvgIcon();
  }, [setSvgs]);

  if (!svgs) return null;

  return <SvgContext.Provider value={svgState}>{children}</SvgContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSvgContext() {
  const context = useContext(SvgContext);
  if (!context) {
    throw new Error("useSvgContext must be used within a SvgProvider");
  }

  return context[0];
}
