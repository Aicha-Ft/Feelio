import { useEffect, useState } from "react";
import { Heart, Compass, Gamepad2, History } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import SectionTitle from "../../components/common/SectionTitle";
import Badge from "../../components/common/Badge";
import EmptyState from "../../components/common/EmptyState";
import { formatDate } from "../../utils/format";

const typesMeta = {
  questionnaire: { label: "Questionnaire", icon: Heart, couleur: "corail" },
  scenario: { label: "Scénario", icon: Compass, couleur: "jaune" },
  jeu: { label: "Mini-jeu", icon: Gamepad2, couleur: "violet" },
};

export default function EnfantHistorique() {
  const { enfantActif } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!enfantActif) return;
    mockApi.getHistoriqueByEnfant(enfantActif.id).then(setItems);
  }, [enfantActif]);

  return (
    <div className="space-y-6">
      <SectionTitle title="Mon historique" subtitle="Retrouve toutes tes activités passées" />

      {items.length === 0 ? (
        <EmptyState
          title="Aucune activité pour le moment"
          description="Commence un questionnaire, un scénario ou un mini-jeu !"
        />
      ) : (
        <div className="grid gap-3">
          {items.map((h) => {
            const meta = typesMeta[h.type];
            const Icon = meta.icon;
            return (
              <Card key={h.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${meta.couleur}/20`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-encre">{h.titre}</p>
                    <p className="text-xs text-black/50">{meta.label} · {formatDate(h.date)}</p>
                  </div>
                </div>
                <Badge couleur="jaune">+{h.points} pts</Badge>
              </Card>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-black/40">
        <History size={12} /> Historique local — non synchronisé
      </div>
    </div>
  );
}