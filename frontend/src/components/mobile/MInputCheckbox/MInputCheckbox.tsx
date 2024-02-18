import { twMerge } from "tailwind-merge";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MText from "../MText/MText";
import MInputCheckboxStyle from "./MInputCheckbox.style";

type Props = {
  value?: boolean;
  children: string;
  onChange: (value: boolean) => void;
  style?: string;
};

export default function MInputCheckbox({
  value = false,
  children,
  onChange,
  style,
}: Props) {
  function toggle() {
    onChange(!value);
  }

  return (
    <div
      className={twMerge(MInputCheckboxStyle.base, style)}
      onClick={toggle}
    >
      <MText
        type="small"
        color="text-m-main"
        style={twMerge(
          MInputCheckboxStyle.checkmark,
          value && MInputCheckboxStyle.checked,
        )}
      >
        {value && <FontAwesomeIcon icon={faCheck} />}
      </MText>
      <MText type="small" color="text-m-moonlight60">
        {children}
      </MText>
    </div>
  );
}
