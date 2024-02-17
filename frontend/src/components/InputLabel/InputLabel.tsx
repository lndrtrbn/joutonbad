import InputText from "../InputText/InputText";
import InputLabelStyle from "./InputLabel.style";

type Props = {
  value?: [string, string];
  onChange: (value: [string, string]) => void;
  label?: string;
  namePlaceholder: string;
  valuePlaceholder: string;
};

export default function InputLabel({
  value,
  onChange,
  label,
  namePlaceholder,
  valuePlaceholder,
}: Props) {
  return (
    <div className={InputLabelStyle.base}>
      {label && <p>{label}</p>}
      <InputText
        value={value ? value[0] : ""}
        placeholder={namePlaceholder}
        onChange={(val) => onChange([val, value ? value[1] : ""])}
      />
      <InputText
        value={value ? value[1] : ""}
        placeholder={valuePlaceholder}
        onChange={(val) => onChange([value ? value[0] : "", val])}
      />
    </div>
  );
}
