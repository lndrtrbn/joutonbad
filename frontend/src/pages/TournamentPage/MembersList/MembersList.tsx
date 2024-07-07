import { useMemo } from "react";

import MembersListStyle from "./MembersList.style";
import Title from "../../../components/Title/Title";
import { Discipline } from "../../../utils/discipline";
import { Registration } from "../../../utils/registration";
import PlayerRegistration from "./PlayerRegistration/PlayerRegistration";

type Props = {
  registrations: Registration[];
};

export default function MembersList({ registrations }: Props) {
  const filteredRegs = useMemo(() => {
    const filtered: Registration[] = [];
    const picked: { [key in Discipline]: string[] } = {
      [Discipline.DD]: [],
      [Discipline.DH]: [],
      [Discipline.DM]: [],
      [Discipline.SD]: [],
      [Discipline.SH]: [],
    };
    registrations
      .filter((reg) => !reg.cancelled)
      .sort((a, b) =>
        `${a.player.lastname} ${a.player.name}`.localeCompare(
          `${b.player.lastname} ${b.player.name}`,
        ),
      )
      .forEach((reg) => {
        if (!picked[reg.discipline].includes(reg.player.license)) {
          filtered.push(reg);
          picked[reg.discipline].push(reg.player.license);
          if (reg.partner) {
            picked[reg.discipline].push(reg.partner.license);
          }
        }
      });
    return filtered;
  }, [registrations]);

  return (
    <div className={MembersListStyle.base}>
      <Title size="2xl">Membres du club présent.e.s</Title>

      <div className={MembersListStyle.registrations}>
        {filteredRegs.map((registration, i) => (
          <PlayerRegistration
            registration={registration}
            key={registration.id}
            style={i % 2 === 0 ? "bg-bg" : "py-0"}
          />
        ))}

        {registrations.length == 0 && (
          <Title subtitle>Aucun inscription pour le moment</Title>
        )}
      </div>
    </div>
  );
}
