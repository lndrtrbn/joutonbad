import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import InputLabelStyle from "./InputLabel.style";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type Props = {
  value?: [string, string];
  onChange: (value: [string, string]) => void;
  onDelete: () => void;
  namePlaceholder: string;
  valuePlaceholder: string;
};

export default function InputLabel({
  value,
  onChange,
  onDelete,
  namePlaceholder,
  valuePlaceholder,
}: Props) {
  return (
    <div className={InputLabelStyle.base}>
      <InputText
        value={value ? value[0] : ""}
        placeholder={namePlaceholder}
        onChange={(val) => onChange([val, value ? value[1] : ""])}
        width="flex-[1]"
      />
      <InputText
        value={value ? value[1] : ""}
        placeholder={valuePlaceholder}
        onChange={(val) => onChange([value ? value[0] : "", val])}
        width="flex-[1] sm:flex-[2]"
      />
      <Button type="button" variant="icon" style="shrink-0" onClick={onDelete}>
        <FontAwesomeIcon icon={faClose} />
      </Button>
    </div>
  );
}
