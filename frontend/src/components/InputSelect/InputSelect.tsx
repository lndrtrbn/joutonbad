import { twMerge } from "tailwind-merge";
import { useMemo, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import InputSelectStyle from "./InputSelect.style";
import useClickOutside from "../../hooks/useClickOutside";

export type InputSelectProps<T> = {
  value?: T;
  items: T[];
  onChange: (value: T | undefined) => void;
  toLabel: (v: T) => string;
  placeholder?: string;
  error?: string;
  inError?: boolean;
  canFilter?: boolean;
  disabled?: boolean;
  style?: string;
};

export default function InputSelect<T>({
  value,
  onChange,
  placeholder,
  toLabel,
  error,
  inError = false,
  canFilter = true,
  disabled = false,
  items = [],
  style = "",
}: InputSelectProps<T>) {
  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState(false);

  const ref = useClickOutside(() => setOpened(false));

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      toLabel(item).toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search, toLabel]);

  function onSelectItem(item: T) {
    setSearch("");
    setOpened(false);
    onChange(item);
  }

  return (
    <div ref={ref} className={twMerge(InputSelectStyle.base, style)}>
      <div onClick={() => setOpened(true)}>
        <InputText
          value={value ? toLabel(value) : ""}
          placeholder={placeholder}
          error={error}
          inError={inError}
          disabled={disabled}
          readonly
          width="sm:w-full"
        />
      </div>

      {value && (
        <div className={InputSelectStyle.closeBtn}>
          <Button
            variant="inline"
            onClick={() => onChange(undefined)}
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </Button>
        </div>
      )}

      {opened && (
        <div className={InputSelectStyle.list}>
          {canFilter && (
            <div className={InputSelectStyle.searchContainer}>
              <InputText
                value={search}
                onChange={setSearch}
                placeholder="Chercher..."
                width="sm:w-full"
              />
            </div>
          )}
          <div className={InputSelectStyle.items}>
            {filteredItems.map((item) => (
              <p key={toLabel(item)}>
                <Button
                  onClick={() => onSelectItem(item)}
                  variant="inline"
                >
                  {toLabel(item)}
                </Button>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
