import {
  faCheck,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

import { Discipline } from "../../../../utils/discipline";
import MText from "../../../../components/mobile/MText/MText";
import MIcon from "../../../../components/mobile/MIcon/MIcon";
import { Registration } from "../../../../utils/registration";
import MContainer from "../../../../components/mobile/MContainer/MContainer";

type Props = {
  registrations: Registration[];
  style?: string;
};

export default function MTournamentRegistrations({
  registrations,
  style,
}: Props) {
  const filteredRegs = useMemo(() => {
    const filtered: Registration[] = [];
    const picked: { [key in Discipline]: string[] } = {
      [Discipline.DD]: [],
      [Discipline.DH]: [],
      [Discipline.DM]: [],
      [Discipline.SD]: [],
      [Discipline.SH]: [],
    };
    registrations.forEach((reg) => {
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
    <div className={style}>
      <MText type="accent" style="pb-6">
        Membres du club présent.e.s
      </MText>

      {filteredRegs.map((reg, i) => (
        <MContainer
          key={reg.id}
          style={`items-center p-4 px-6 ${i % 2 != 0 ? "bg-x" : ""}`}
        >
          <div className="flex-1">
            <MText type="small">
              {reg.player.lastname} {reg.player.name}
            </MText>
            {reg.partner && (
              <MText
                type="small"
                color="text-m-moonlight60"
                style="block"
              >
                {reg.partner.lastname} {reg.partner.name}
              </MText>
            )}
          </div>
          <MText type="small">{reg.discipline}</MText>
          <MIcon
            icon={reg.sent ? faCheck : faHourglass}
            color={reg.sent ? "text-m-main" : "text-m-moon60"}
            size="text-xl"
            naked
          />
        </MContainer>
      ))}
    </div>
  );
}
