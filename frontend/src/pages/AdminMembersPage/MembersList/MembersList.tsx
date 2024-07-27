import { useState } from "react";

import MemberRow from "./MemberRow/MemberRow";
import { Player } from "../../../utils/player";
import Title from "../../../components/Title/Title";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../../components/Pagination/Pagination";
import InputCheckbox from "../../../components/InputCheckbox/InputCheckbox";

type Props = {
  members: Player[];
};

export default function MembersList({ members }: Props) {
  const [active, setActive] = useState(true);
  const [inactive, setInactive] = useState(true);

  const [paginatedPlayers, pagination] = usePagination(
    (members ?? [])
      .filter((player) => inactive || player.kcId)
      .filter((player) => active || !player.kcId)
      .sort((a, b) =>
        `${a.lastname} ${a.name}`.localeCompare(`${b.lastname} ${b.name}`),
      ),
  );

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-8 mb-4">
        <InputCheckbox
          checked={inactive}
          onChange={setInactive}
          children="Inactif.ve"
        />

        <InputCheckbox checked={active} onChange={setActive} children="Actif.ve" />
      </div>

      <div className="overflow-auto">
        {paginatedPlayers.map((player, i) => (
          <MemberRow key={i} member={player} alt={i % 2 == 0} />
        ))}

        {paginatedPlayers.length === 0 && (
          <Title subtitle>
            Aucun membre ne correspond aux critères de recherche
          </Title>
        )}
      </div>

      <Pagination {...pagination} />
    </section>
  );
}
