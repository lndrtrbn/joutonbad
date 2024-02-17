import { twMerge } from "tailwind-merge";
import { useMemo, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import MText from "../MText/MText";
import MIcon from "../MIcon/MIcon";
import MInputText from "../MInputText/MInputText";
import MContainer from "../MContainer/MContainer";
import MInputSelectStyle from "./MInputSelect.style";
import useClickOutside from "../../../hooks/useClickOutside";

export type Props<T> = {
  value?: T;
  items: T[];
  onChange: (value: T | undefined) => void;
  toLabel: (v: T) => string;
  placeholder?: string;
  canFilter?: boolean;
  style?: string;
};

export default function MInputSelect<T>({
  value,
  onChange,
  placeholder,
  toLabel,
  canFilter = true,
  items = [],
  style = "",
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState(false);

  const ref = useClickOutside(() => setOpened(false));

  const filteredItems = useMemo(() => {
    return items
      .filter((item) =>
        toLabel(item).toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => toLabel(a).localeCompare(toLabel(b)));
  }, [items, search, toLabel]);

  function onSelectItem(item: T) {
    setSearch("");
    setOpened(false);
    onChange(item);
  }

  return (
    <div className={twMerge(MInputSelectStyle.base, style)}>
      <div onClick={() => setOpened(true)}>
        <MInputText
          value={value ? toLabel(value) : ""}
          placeholder={placeholder}
          style="sm:w-full"
          readonly
        />
      </div>

      {value && (
        <div className={MInputSelectStyle.closeBtn}>
          <MIcon icon={faClose} onClick={() => onChange(undefined)} />
        </div>
      )}

      {opened && (
        <div className={MInputSelectStyle.listContainer}>
          <div className={MInputSelectStyle.listBg}>
            <div ref={ref} className={MInputSelectStyle.list}>
              {canFilter && (
                <div className={MInputSelectStyle.searchContainer}>
                  <MInputText
                    value={search}
                    onChange={setSearch}
                    placeholder="Chercher..."
                    style="sm:w-full"
                  />
                </div>
              )}
              <div className={MInputSelectStyle.items}>
                {filteredItems.map((item, i) => (
                  <MContainer
                    style={`items-center p-4 px-6 ${
                      i % 2 != 0 ? "bg-x" : ""
                    }`}
                    onClick={() => onSelectItem(item)}
                  >
                    <MText type="small" key={toLabel(item)}>
                      {toLabel(item)}
                    </MText>
                  </MContainer>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
