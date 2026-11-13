const couleurs = {
  turquoise: "bg-turquoise",
  violet: "bg-violet",
  jaune: "bg-jaune",
  corail: "bg-corail",
};

export default function ProgressBar({ value = 0, couleur = "turquoise", label }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex justify-between text-xs text-black/60">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="h-2.5 w-full rounded-full bg-black/5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${couleurs[couleur] || couleurs.turquoise}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}