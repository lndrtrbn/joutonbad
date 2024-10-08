import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useModal from "../../../hooks/useModal";
import Link from "../../../components/Link/Link";
import TournamentRowStyle from "./TournamentRow.style";
import { Tournament } from "../../../utils/tournament";
import Button from "../../../components/Button/Button";
import ModalInfo from "../../../components/ModalInfo/ModalInfo";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm";

type TournamentRowProps = {
  tournament: Tournament;
  onDelete: (id: string) => Promise<unknown>;
  alt?: boolean;
};

export default function TournamentRow({
  tournament,
  onDelete,
  alt = false,
}: TournamentRowProps) {
  const [portal, open, close] = useModal();

  const confirmModal = (
    <ModalConfirm
      onClose={close}
      onConfirm={async () => {
        await onDelete(tournament.id);
        close();
      }}
    >
      <p>
        Es-tu sûr.e de vouloir supprimer le tournoi
        <span className="font-medium"> "{tournament.name}"</span> ?
      </p>
    </ModalConfirm>
  );

  const infoModal = (
    <ModalInfo title="Le tournoi ne peut pas être supprimé" onClose={close}>
      <p>
        Des inscriptions ont déjà été faites pour le tournoi{" "}
        <span className="font-medium"> "{tournament.name}"</span>. Pour cette raison
        il ne peut pas être supprimé.
      </p>
    </ModalInfo>
  );

  function askDelete() {
    open(tournament.registrations.length > 0 ? infoModal : confirmModal);
  }

  return (
    <>
      <div
        className={twMerge(TournamentRowStyle.base, alt && TournamentRowStyle.alt)}
      >
        <span className={TournamentRowStyle.dates}>
          {format(new Date(tournament.startDate), "dd/MM ")}
          au
          {format(new Date(tournament.endDate), " dd/MM/yyyy")}
        </span>
        <Link
          to={`/tournoi/${tournament.id}`}
          inline
          style={TournamentRowStyle.name}
        >
          {tournament.name}
        </Link>
        <span className={TournamentRowStyle.disciplines}>
          {tournament.disciplines.join(" ")}
        </span>
        <span className={TournamentRowStyle.levels}>
          {tournament.minLevel} à {tournament.maxLevel}
        </span>

        <Link inline to={tournament.id}>
          <FontAwesomeIcon icon={faPencil} />
        </Link>
        <Button variant="inline" onClick={askDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>

      {portal}
    </>
  );
}
