import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";

const priorites = {
  haute: { label: "Priorité haute", couleur: "corail" },
  moyenne: { label: "Priorité moyenne", couleur: "jaune" },
  basse: { label: "Priorité basse", couleur: "turquoise" },
};

export default function ParentRecommandations() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    mockApi.getRecommandations().then(setItems);
  }, []);

  return (
    <div className="space-y-6">
      <SectionTitle title="Recommandations" subtitle="Conseils personnalisés pour chaque enfant" />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((r) => {
          const p = priorites[r.priorite] || priorites.basse;
          return (
            <Card key={r.id}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jaune/25 text-yellow-800">
                  <Lightbulb size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-encre">{r.titre}</p>
                  <p className="mt-1 text-sm text-black/60">{r.contenu}</p>
                  <div className="mt-2">
                    <Badge couleur={p.couleur}>{p.label}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}