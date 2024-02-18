import Tag from "../Tag/Tag";
import InputTagStyle from "./InputTag.style";

export type InputTagProps = {
  list: readonly string[];
  value?: string[];
  onChange: (value: string[]) => void;
  label?: string;
  unique?: boolean;
};

export default function InputTag({
  list,
  value = [],
  onChange,
  label,
  unique = false,
}: InputTagProps) {
  function toggle(tag: string) {
    onChange(
      value.includes(tag)
        ? value.filter((val) => val != tag)
        : unique
          ? [tag]
          : [...value, tag],
    );
  }

  return (
    <div className={InputTagStyle.base}>
      {label && <p>{label}</p>}
      <div className={InputTagStyle.list}>
        {list.map((item) => (
          <Tag
            key={item}
            active={value.includes(item)}
            onClick={() => toggle(item)}
          >
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}
