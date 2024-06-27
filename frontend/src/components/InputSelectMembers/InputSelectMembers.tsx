import { Player } from "../../utils/player";
import InputSelect from "../InputSelect/InputSelect";

type Props = {
  players: Player[];
  value?: Player;
  onChange: (p: Player | undefined) => void;
  placeholder?: string;
};

export default function InputSelectMembers({
  players,
  onChange,
  value,
  placeholder = "Membre",
}: Props) {
  const sortedPlayers = (players ?? []).sort((a, b) => {
    const aName = `${a.lastname} ${a.name} - ${a.license}`;
    const bName = `${b.lastname} ${b.name} - ${b.license}`;
    return aName.localeCompare(bName);
  });

  return (
    <InputSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      items={sortedPlayers ?? []}
      toLabel={(p) => `${p.lastname} ${p.name} - ${p.license}`}
      style="w-full sm:w-96"
    />
  );
}
