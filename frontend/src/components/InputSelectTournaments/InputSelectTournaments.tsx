import { Tournament } from "../../utils/tournament";
import InputSelect from "../InputSelect/InputSelect";

type Props = {
  tournaments: Tournament[];
  value?: Tournament;
  onChange: (t: Tournament | undefined) => void;
  placeholder?: string;
};

export default function InputSelectTournaments({
  tournaments,
  onChange,
  value,
  placeholder = "Tournoi",
}: Props) {
  const sortedTournaments = (tournaments ?? []).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <InputSelect
      value={value}
      onChange={onChange}
      style="w-full sm:w-[380px]"
      placeholder={placeholder}
      items={sortedTournaments}
      toLabel={(t) => t.name}
    />
  );
}
