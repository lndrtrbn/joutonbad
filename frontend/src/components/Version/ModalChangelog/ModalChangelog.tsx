import Modal from "../../Modal/Modal";
import Title from "../../Title/Title";
import Button from "../../Button/Button";
import Separator from "../../Separator/Separator";
import ModalHeader from "../../ModalHeader/ModalHeader";
import ModalChangelogStyle from "./ModalChangelog.style";

type Props = {
  onClose: () => void;
};

export default function ModalChangelog({ onClose }: Props) {
  return (
    <Modal onClickOutside={onClose}>
      <ModalHeader>Changelog</ModalHeader>

      <Title subtitle>
        Liste des fonctionnalités ajoutées au cours des versions
      </Title>

      <Separator />

      <div className={ModalChangelogStyle.list}>
        <Title>1.5.1</Title>
        <Title subtitle>
          Fix d'un bug sur la somme des coûts d'inscription si
          inscriptions annulées
        </Title>
        <Title subtitle>
          Fix d'un bug sur l'inscription avec une personne qui avait
          annulé son inscription
        </Title>
        <Title subtitle>
          Champ de sélection de membres avec tri sur le nom au lieu du
          prénom
        </Title>

        <Title>1.5.0</Title>
        <Title subtitle>
          Fix d'un bug avec Google Translate qui faisait crash l'appli
        </Title>
        <Title subtitle>
          Au survol d'un.e membre inscrit.e à un tournoi, le nom de
          son/sa partenaire est affiché
        </Title>
        <Title subtitle>[Admin] Pouvoir modifier un tournoi</Title>
        <Title subtitle>
          [Admin] Pouvoir clôturer les inscriptions d'un tournoi
        </Title>

        <Title>1.4.0</Title>
        <Title subtitle>
          [Admin] Pouvoir annuler une inscription sans la supprimer
        </Title>

        <Title>1.3.1</Title>
        <Title subtitle>
          [Admin] Correction d'un bug sur l'import de membres
        </Title>

        <Title>1.3.0</Title>
        <Title subtitle>
          Affichage des prix d'inscription sur la page d'un tournoi
        </Title>
        <Title subtitle>
          [Admin] Pouvoir ajouter précisement le coût d'inscription
          par nombre de tableaux joués
        </Title>

        <Title>1.2.0</Title>
        <Title subtitle>
          [Admin] Pouvoir filtrer la liste des membres selon s'ils
          sont actif.ves ou non et admin ou non
        </Title>

        <Title>1.1.0</Title>
        <Title subtitle>
          Ajout de la FAQ pour répondre aux questions courantes
        </Title>
        <Title subtitle>
          Dans le formulaire d'inscription, pouvoir préciser si son/sa
          partenaire a déjà réglé de son côté
        </Title>
        <Title subtitle>
          [Admin] Pouvoir filtrer la liste des inscriptions par membre
          et par tournois
        </Title>
        <Title subtitle>
          [Admin] Pouvoir supprimer une inscription sans
          automatiquement supprimer celle de son/sa partenaire
        </Title>

        <Title>1.0.0</Title>
        <Title subtitle>Pas le courage de tout écrire</Title>
      </div>

      <div className={ModalChangelogStyle.actions}>
        <Button onClick={onClose} variant="light">
          Fermer
        </Button>
      </div>
    </Modal>
  );
}
