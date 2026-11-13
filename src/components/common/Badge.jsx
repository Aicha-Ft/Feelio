const couleurs = {
  turquoise: "bg-turquoise/15 text-turquoise-dark",
  violet: "bg-violet/15 text-violet-dark",
  jaune: "bg-jaune/25 text-yellow-800",
  corail: "bg-corail/20 text-red-700",
  gris: "bg-black/5 text-black/60",
};

export default function Badge({ children, couleur = "turquoise", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${couleurs[couleur] || couleurs.turquoise} ${className}`}
    >
      {children}
    </span>
  );
}