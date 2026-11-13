import { useEffect, useState } from "react";
import { Gamepad2, Play, Star } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";

export default function EnfantJeux() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    mockApi.getJeux().then(setItems);
  }, []);

  return (
    <div className="space-y-6">
      <SectionTitle title="Mini-jeux" subtitle="Joue et gagne des points !" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((j) => (
          <Card key={j.id} hover className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/15 text-violet-dark">
                <Gamepad2 size={22} />
              </div>
              <Badge couleur="corail">{j.niveau}</Badge>
            </div>
            <div className="mt-3">
              <p className="font-bold text-encre">{j.titre}</p>
              <p className="text-xs text-black/50">{j.description}</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-yellow-700">
              <Star size={14} className="text-jaune" />
              {j.points} points · {j.dureeMin} min
            </div>
            <Button variant="secondary" className="mt-4 w-full">
              <Play size={16} /> Jouer
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}