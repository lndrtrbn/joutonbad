import {
  faCheck,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tag from "../../../../../components/Tag/Tag";
import { Registration } from "../../../../../utils/registration";
import PlayerRegistrationStyle from "./PlayerRegistration.style";

type Props = {
  registration: Registration;
};

export default function PlayerRegistration({ registration }: Props) {
  const partnerStr = registration.partner
    ? `Avec ${registration.partner.lastname} ${registration.partner.name} | `
    : "";

  return (
    <div
      className={PlayerRegistrationStyle.base}
      title={
        registration.sent
          ? `${partnerStr}Inscription envoyée`
          : `${partnerStr}Inscription à envoyer`
      }
    >
      <FontAwesomeIcon
        size="sm"
        color={registration.sent ? "#80ed99" : undefined}
        icon={registration.sent ? faCheck : faHourglass}
      />
      <p className={PlayerRegistrationStyle.name}>
        {registration.player.lastname} {registration.player.name}
      </p>
      <Tag size="sm">{registration.discipline}</Tag>
    </div>
  );
}
