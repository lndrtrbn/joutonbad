import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPaperPlane, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import useModal from "../../../../hooks/useModal";
import Link from "../../../../components/Link/Link";
import RegistrationRowStyle from "./RegistrationRow.style";
import { Registration } from "../../../../utils/registration";
import ModalConfirm from "../../../../components/ModalConfirm/ModalConfirm";
import ModalCancelRegistration from "./ModalCancelRegistration/ModalCancelRegistration";

type Props = {
  registration: Registration;
  onSend?: (id: string) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
  onCancel?: (id: string, reason: string) => Promise<unknown>;
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
        onConfirm={async (reason: string) => {
          await onCancel?.(registration.id, reason);
          close();
        }}
      />,
    );
  }

  function askSend() {
    open(
      <ModalConfirm
        onClose={close}
        onConfirm={async () => {
          await onSend?.(registration.id);
          close();
        }}
      >
        <p>
          Es-tu sûr.e de vouloir confirmer l'inscription {registration.discipline} de
          <span className="font-medium">
            {" "}
            {registration.player.name} {registration.player.lastname}
          </span>{" "}
          ?
        </p>
      </ModalConfirm>,
    );
  }

  function askDelete() {
    open(
      <ModalConfirm
        onClose={close}
        onConfirm={async () => {
          await onDelete(registration.id);
          close();
        }}
      >
        <p>
          Es-tu sûr.e de vouloir supprimer l'inscription {registration.discipline} de
          <span className="font-medium">
            {" "}
            {registration.player.name} {registration.player.lastname}
          </span>{" "}
          ?
        </p>
      </ModalConfirm>,
    );
  }

  return (
    <>
      <div
        className={twMerge(
          RegistrationRowStyle.base,
          alt && RegistrationRowStyle.alt,
        )}
      >
        <span className="w-[80px]">
          {format(new Date(registration.createdAt), "dd/MM/yyyy")}
        </span>

        <div className={RegistrationRowStyle.link}>
          <Link to={`/tournoi/${registration.tournament?.id}`} inline>
            {registration.tournament?.name}
          </Link>
          {registration.cancelled && (
            <>
              <br />
              <span className={RegistrationRowStyle.cancelled}>
                {registration.cancelled}
              </span>
            </>
          )}
        </div>

        <span className="w-[25px]">{registration.discipline}</span>

        <span className="w-[25px]">
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

        <span className="w-[65px]">
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

        <span className="w-[50px] whitespace-nowrap overflow-hidden text-ellipsis">
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

        <span className="min-w-[180px] flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {registration.player.name} {registration.player.lastname}
          {registration.partner && (
            <>
              <br />
              <span className={RegistrationRowStyle.partner}>
                {registration.partner.name} {registration.partner.lastname}
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
