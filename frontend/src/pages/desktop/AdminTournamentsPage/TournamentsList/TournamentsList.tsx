import { useState } from "react";

import { Tournament } from "../../../../utils/tournament";
import TournamentRow from "../TournamentRow/TournamentRow";
import usePagination from "../../../../hooks/usePagination";
import InputText from "../../../../components/InputText/InputText";
import Pagination from "../../../../components/Pagination/Pagination";

type Props = {
  tournaments: Tournament[];
  onDelete: (id: string) => Promise<unknown>;
};

export default function TournamentsList({
  tournaments,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");
  const [paginatedTournaments, pagination] = usePagination(
    tournaments
      .filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()),
      )
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() -
          new Date(b.startDate).getTime(),
      ),
  );

  return (
    <section className="flex flex-col gap-4">
      <InputText
        value={search}
        onChange={setSearch}
        placeholder="Filtrer par nom de tournoi"
        width="w-full sm:w-96"
        onReset={() => setSearch("")}
      />
      <div className="overflow-auto">
        {paginatedTournaments.map((tournament, i) => (
          <TournamentRow
            onDelete={onDelete}
            tournament={tournament}
            key={i}
            alt={i % 2 == 0}
          />
        ))}
      </div>
      <Pagination {...pagination} />
    </section>
  );
}
