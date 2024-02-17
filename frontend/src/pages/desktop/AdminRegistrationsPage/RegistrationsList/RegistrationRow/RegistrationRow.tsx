import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import useModal from "../../../../../hooks/useModal";
import Link from "../../../../../components/Link/Link";
import RegistrationRowStyle from "./RegistrationRow.style";
import { Registration } from "../../../../../utils/registration";
import ModalConfirm from "../../../../../components/ModalConfirm/ModalConfirm";
import ModalCancelRegistration from "./ModalCancelRegistration/ModalCancelRegistration";

type Props = {
  registration: Registration;
  onSend?: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel?: (id: string, reason: string) => void;
  canSend?: boolean;
  canCancel?: boolean;
  alt?: boolean;
};

export default function RegistrationRow({
  registration,
  onSend,
  onDelete,
  onCancel,
  canSend = false,
  canCancel = false,
  alt = false,
}: Props) {
  const [portal, open, close] = useModal();

  function askCancel() {
    open(
      <ModalCancelRegistration
        registration={registration}
        onClose={close}
        onConfirm={(reason: string) => {
          onCancel?.(registration.id, reason);
          close();
        }}
      />
    );
  }

  function askSend() {
    open(
      <ModalConfirm
        onClose={close}
        onConfirm={() => {
          onSend?.(registration.id);
          close();
        }}
      >
        <p>
          Es-tu sûr.e de vouloir confirmer l'inscription{" "}
          {registration.discipline} de
          <span className="font-medium">
            {" "}
            {registration.player.name} {registration.player.lastname}
          </span>{" "}
          ?
        </p>
      </ModalConfirm>
    );
  }

  function askDelete() {
    open(
      <ModalConfirm
        onClose={close}
        onConfirm={() => {
          onDelete(registration.id);
          close();
        }}
      >
        <p>
          Es-tu sûr.e de vouloir supprimer l'inscription{" "}
          {registration.discipline} de
          <span className="font-medium">
            {" "}
            {registration.player.name} {registration.player.lastname}
          </span>{" "}
          ?
        </p>
      </ModalConfirm>
    );
  }

  return (
    <>
      <div
        className={twMerge(
          RegistrationRowStyle.base,
          alt && RegistrationRowStyle.alt,
          (registration.partner || registration.cancelled) &&
            RegistrationRowStyle.double,
          registration.partner &&
            registration.cancelled &&
            RegistrationRowStyle.triple
        )}
      >
        <span className="w-32">
          {format(new Date(registration.createdAt), "dd/MM/yyyy")}
        </span>

        <span className="w-72">
          <Link to={`/tournoi/${registration.tournament?.id}`}>
            {registration.tournament?.name}
          </Link>
        </span>

        <span className="w-10">{registration.discipline}</span>

        <span className="w-10">
          {registration.level}
          {registration.partner && (
            <>
              <br />
              <span className={RegistrationRowStyle.partner}>
                {registration.partner.level}
              </span>
            </>
          )}
        </span>

        <span className="w-28">
          {registration.player.license}
          {registration.partner && (
            <>
              <br />
              <span className={RegistrationRowStyle.partner}>
                {registration.partner.license}
              </span>
            </>
          )}
        </span>

        <span className="w-16">
          {registration.player.club}
          {registration.partner && (
            <>
              <br />
              <span className={RegistrationRowStyle.partner}>
                {registration.partner.club}
              </span>
            </>
          )}
        </span>

        <span className="w-60 flex-1">
          {registration.player.name} {registration.player.lastname}
          {registration.partner && (
            <>
              <br />
              <span className={RegistrationRowStyle.partner}>
                {registration.partner.name}{" "}
                {registration.partner.lastname}
              </span>
            </>
          )}
          {registration.cancelled && (
            <>
              <br />
              <span className={RegistrationRowStyle.cancelled}>
                {registration.cancelled}
              </span>
            </>
          )}
        </span>

        {canSend && (
          <FontAwesomeIcon
            onClick={askSend}
            className={RegistrationRowStyle.action}
            icon={faPaperPlane}
          />
        )}
        {canCancel && (
          <FontAwesomeIcon
            onClick={askCancel}
            className={RegistrationRowStyle.action}
            icon={faBan}
          />
        )}
        <FontAwesomeIcon
          onClick={askDelete}
          className={RegistrationRowStyle.action}
          icon={faTrashCan}
        />
      </div>

      {portal}
    </>
  );
}
