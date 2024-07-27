type Faq = {
  question: string;
  answers: string[];
}[];

export const FAQ: Faq = [
  {
    question: "A quoi sert cette application ?",
    answers: [
      "À s'inscrire aux tournois organisés par les autres clubs.",
      "Dans notre club ce sont des bénévoles qui se chargent de récuperer vos inscriptions pour ensuite les ajouter sur Badnet.",
      "L'application est là pour leur faciliter le travail et centraliser la récupération de ces inscriptions.",
    ],
  },
  {
    question: "Comment sont utilisées mes données personnelles ?",
    answers: [
      "Elles sont utilisées uniquement pour le bon fonctionnement de l'application.",
      "Aucune donnée n'est transmise à des tiers.",
      "Le mail sert en cas d'oublie du mot de passe. Le nom et la licence sont les informations nécessaires pour pouvoir faire les inscriptions.",
      "Pour toute question RGDP ou la suppression de compte tu peux contacter un membre du bureau.",
    ],
  },
  {
    question: "Comment faire pour m'inscrire à un tournoi ?",
    answers: [
      "Sur le calendrier tu trouveras les tournois dont les inscriptions sont gérées par les bénévoles du club.",
      "En te rendant sur la page d'un tournoi tu pourras remplir les formulaires d'inscription pour chaque catégorie disponible (simple, double, mixte).",
      "Rien d'autre à faire, les bénévoles prennent le relais pour t'inscrire au tournoi via badnet ou directement avec le club organisateur.",
      "Sur la page 'Mon récap' tu trouveras la liste des tournois où tu as été inscrit.e, cependant seul Badnet fait foi pour savoir si ton inscription est validée par les organisateurs.",
    ],
  },
  {
    question: "Comment faire pour me désinscrire d'un tournoi ?",
    answers: [
      "Tu ne peux pas te désinscrire directement depuis l'application afin d'éviter les incohérences avec l'équipe de bénévoles.",
      "Il faut contacter directement la personne responsable du tournoi en question. Le nom de la personne responsable se trouve sur la page du tournoi.",
    ],
  },
  {
    question: "Comment m'inscrire à un tournoi qui n'est pas dans le calendrier ?",
    answers: [
      "Plusieurs cas sont possibles. Si le tournoi est dans longtemps, il n'a peut-être juste pas encore été ajouté, patience.",
      "Sinon c'est sûrement que le tournoi est loin de Rennes et dans ce cas le club ne prend pas en charge les inscriptions.",
      "Si jamais plusieurs personnes sont intéressées par ce tournoi vous pouvez demander à ce que les responsables l'ajoute. Sinon il faudra s'inscrire par vous même, le plus souvent avec Badnet.",
    ],
  },
  {
    question: "Cette application est-elle liée à badnet ou e-bad ?",
    answers: [
      "Non il n'y a aucun lien. Cette application a juste pour but de centraliser les inscriptions des membres du club.",
      "Veuillez donc toujours à regarder le statut de vos inscriptions sur ebad et badnet.",
    ],
  },
  {
    question: "Comment déclarer un bug ?",
    answers: ["Tu peux contacter un.e membre du bureau si tu rencontres un bug."],
  },
];
