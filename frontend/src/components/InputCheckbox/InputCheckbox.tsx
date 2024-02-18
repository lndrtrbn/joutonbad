import { twMerge } from "tailwind-merge";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InputCheckboxStyle from "./InputCheckbox.style";

type Props = {
  checked?: boolean;
  children: string;
  onChange: (value: boolean) => void;
};

export default function InputCheckbox({
  checked = false,
  children,
  onChange,
}: Props) {
  function check() {
    onChange(!checked);
  }

  return (
    <div
      className={twMerge(
        InputCheckboxStyle.base,
        checked && InputCheckboxStyle.checked,
      )}
      onClick={check}
    >
      <label className={InputCheckboxStyle.label}>{children}</label>
      <span className={InputCheckboxStyle.checkmark}>
        {checked && <FontAwesomeIcon icon={faCheck} />}
      </span>
      <input
        className={InputCheckboxStyle.input}
        type="checkbox"
        defaultChecked={checked}
      />
    </div>
  );
}
