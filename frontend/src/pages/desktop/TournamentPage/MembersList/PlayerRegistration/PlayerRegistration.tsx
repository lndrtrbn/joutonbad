import {
  faCheck,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tag from "../../../../../components/Tag/Tag";
import { Registration } from "../../../../../utils/registration";

type Props = {
  registration: Registration;
  style?: string;
};

export default function PlayerRegistration({
  registration,
  style,
}: Props) {
  const partnerStr = registration.partner
    ? `Avec ${registration.partner.lastname} ${registration.partner.name} | `
    : "";

  return (
    <div
      className={twMerge(
        "flex text-black gap-4 items-center p-2 px-4 rounded-2xl",
        style,
      )}
      title={
        registration.sent
          ? `${partnerStr}Inscription envoyée`
          : `${partnerStr}Inscription à envoyer`
      }
    >
      <FontAwesomeIcon
        size="sm"
        icon={registration.sent ? faCheck : faHourglass}
      />
      <div className="flex-1">
        <p>
          {registration.player.lastname} {registration.player.name}
        </p>
        {registration.partner && (
          <p>
            {registration.partner.lastname}{" "}
            {registration.partner.name}
          </p>
        )}
      </div>
      <Tag size="sm">{registration.discipline}</Tag>
    </div>
  );
}
