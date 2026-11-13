import { initials } from "../../utils/format";

const couleurs = {
  turquoise: "bg-turquoise text-white",
  violet: "bg-violet text-white",
  jaune: "bg-jaune text-encre",
  corail: "bg-corail text-white",
};

const tailles = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-xl",
  xl: "h-24 w-24 text-3xl",
};

export default function Avatar({ nom = "", couleur = "turquoise", size = "md" }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-bold ${couleurs[couleur] || couleurs.turquoise} ${tailles[size] || tailles.md}`}
      aria-hidden="true"
    >
      {initials(nom)}
    </div>
  );
}