import { useEffect, useState } from "react";
import { Compass, PlayCircle } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";

export default function EnfantScenarios() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    mockApi.getScenarios().then(setItems);
  }, []);

  return (
    <div className="space-y-6">
      <SectionTitle title="Scénarios interactifs" subtitle="Choisis une aventure à vivre" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <Card key={s.id} hover className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-jaune/25 text-yellow-800">
                <Compass size={22} />
              </div>
              <div>
                <p className="font-bold text-encre">{s.titre}</p>
                <p className="text-xs text-black/50">{s.description}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge couleur="jaune">{s.niveau}</Badge>
              <Badge couleur="gris">{s.dureeMin} min</Badge>
              <Badge couleur="turquoise">{s.etapes} étapes</Badge>
            </div>
            <Button
              variant={s.statut === "termine" ? "outline" : "jaune"}
              className="mt-4 w-full"
            >
              <PlayCircle size={16} />
              {s.statut === "termine" ? "Rejouer" : "Commencer"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}