import { twMerge } from "tailwind-merge";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MemberRowStyle from "./MemberRow.style";
import { Player } from "../../../../utils/player";
import useModal from "../../../../hooks/useModal";
import Button from "../../../../components/Button/Button";
import { useDeletePlayer } from "../../../../http/useHttpPlayer";
import ModalConfirm from "../../../../components/ModalConfirm/ModalConfirm";

type MemberRowProps = {
  member: Player;
  alt?: boolean;
};

export default function MemberRow({
  member,
  alt = false,
}: MemberRowProps) {
  const { mutateAsync: deletePlayer } = useDeletePlayer();
  const [portal, open, close] = useModal();

  function askDelete() {
    open(
      <ModalConfirm
        onClose={close}
        onConfirm={async () => {
          await deletePlayer(member.id);
          close();
        }}
      >
        <p>
          Es-tu sûr.e de vouloir supprimer le profil de
          <span className="font-medium">
            {" "}
            "{member.name} {member.lastname}"
          </span>{" "}
          ?
        </p>
        <p>
          Un compte actif ne devrait pas être supprimé. S'il est
          supprimé, toutes ses inscriptions seront également
          supprimées en même temps.
        </p>
      </ModalConfirm>,
    );
  }

  return (
    <>
      <div
        className={twMerge(
          MemberRowStyle.base,
          alt && MemberRowStyle.alt,
        )}
      >
        <span className={MemberRowStyle.license}>
          {member.license}
        </span>
        <span className={MemberRowStyle.name}>
          {member.lastname} {member.name}
        </span>

        <span className={MemberRowStyle.status}>
          <FontAwesomeIcon
            className={twMerge(
              MemberRowStyle.active,
              !member.kcId && MemberRowStyle.inactive,
            )}
            size="xs"
            icon={faCircle}
          />{" "}
          {member.kcId ? "Actif.ve" : "Inactif.ve"}
        </span>

        <Button variant="inline" onClick={askDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>

      {portal}
    </>
  );
}
