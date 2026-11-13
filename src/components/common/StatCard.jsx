import Card from "./Card";

const couleurs = {
  turquoise: "bg-turquoise/15 text-turquoise-dark",
  violet: "bg-violet/15 text-violet-dark",
  jaune: "bg-jaune/25 text-yellow-800",
  corail: "bg-corail/20 text-red-700",
};

export default function StatCard({ icon: Icon, label, value, couleur = "turquoise", suffix }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${couleurs[couleur] || couleurs.turquoise}`}>
        {Icon && <Icon size={22} />}
      </div>
      <div>
        <div className="text-2xl font-bold text-encre">
          {value}
          {suffix && <span className="ml-1 text-sm font-semibold text-black/40">{suffix}</span>}
        </div>
        <div className="text-xs font-medium text-black/50">{label}</div>
      </div>
    </Card>
  );
}