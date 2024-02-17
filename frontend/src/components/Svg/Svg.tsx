import { SvgNames, useSvgContext } from "../../contexts/svg.context";

// Size of the svg in pixel.
type SvgSize = 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 80;

export type SvgProps = {
  name: SvgNames;
  style?: string;
  size?: SvgSize;
};

/**
 * Component linked to the hook useSvg.
 *
 * @param name The name of the svg file.
 * @param style Custon style to add to the svg.
 * @param size Size of the svg.
 */
export default function Svg({ name, style, size = 24 }: SvgProps) {
  const svgs = useSvgContext();

  if (!svgs) return null;
  const Svg = svgs[name];

  return <Svg className={style} width={size} height={size} />;
}
