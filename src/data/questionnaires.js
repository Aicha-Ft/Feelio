export const questionnaires = [
  {
    id: "q1",
    titre: "Mes émotions d'aujourd'hui",
    description: "Comment te sens-tu en ce moment ?",
    public: "enfant",
    dureeMin: 5,
    statut: "disponible",
    questions: [
      {
        id: "q1-1",
        intitule: "Comment te sens-tu ce matin ?",
        options: ["Joyeux(se)", "Calme", "Fatigué(e)", "Inquiet(e)"],
      },
      {
        id: "q1-2",
        intitule: "Qu'est-ce qui t'a fait sourire aujourd'hui ?",
        options: ["Un ami", "Ma famille", "Un jeu", "Rien pour l'instant"],
      },
    ],
  },
  {
    id: "q2",
    titre: "Reconnaître la colère",
    description: "Apprenons à repérer la colère ensemble.",
    public: "enfant",
    dureeMin: 6,
    statut: "disponible",
    questions: [
      {
        id: "q2-1",
        intitule: "Quand je suis en colère, je...",
        options: ["Crie", "Pleure", "Me calme", "Compte jusqu'à 10"],
      },
    ],
  },
  {
    id: "q3",
    titre: "Bilan émotionnel hebdomadaire",
    description: "Fait le point sur ta semaine.",
    public: "enfant",
    dureeMin: 8,
    statut: "termine",
    questions: [],
  },
  {
    id: "q4",
    titre: "Mes amis et mes émotions",
    description: "Comment je me sens avec les autres.",
    public: "enfant",
    dureeMin: 6,
    statut: "disponible",
    questions: [],
  },
];