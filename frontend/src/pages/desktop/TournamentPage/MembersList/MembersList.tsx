import MembersListStyle from "./MembersList.style";
import Title from "../../../../components/Title/Title";
import { Registration } from "../../../../utils/registration";
import PlayerRegistration from "./PlayerRegistration/PlayerRegistration";

type Props = {
  registrations: Registration[];
};

export default function MembersList({ registrations }: Props) {
  return (
    <div className={MembersListStyle.base}>
      <Title size="2xl">Membres du club présent.e.s</Title>

      <div className={MembersListStyle.registrations}>
        {registrations
          .filter((reg) => !reg.cancelled)
          .sort((a, b) =>
            `${a.player.lastname} ${a.player.name}`.localeCompare(
              `${b.player.lastname} ${b.player.name}`,
            ),
          )
          .map((registration) => (
            <PlayerRegistration
              registration={registration}
              key={registration.id}
            />
          ))}

        {registrations.length == 0 && (
          <Title subtitle>Aucun inscription pour le moment</Title>
        )}
      </div>
    </div>
  );
}
