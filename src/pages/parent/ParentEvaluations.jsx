import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";
import EmptyState from "../../components/common/EmptyState";
import { formatDate } from "../../utils/format";

export default function ParentEvaluations() {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    mockApi.getEvaluations().then(setEvaluations);
  }, []);

  return (
    <div className="space-y-6">
      <SectionTitle title="Évaluations" subtitle="Suivi des évaluations terminées et en cours" />
      {evaluations.length === 0 ? (
        <EmptyState title="Aucune évaluation" />
      ) : (
        <div className="grid gap-3">
          {evaluations.map((e) => (
            <Card key={e.id} className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise-dark">
                  <ClipboardList size={18} />
                </div>
                <div>
                  <p className="font-semibold text-encre">{e.titre}</p>
                  <p className="text-xs text-black/50">
                    {formatDate(e.date)} · {e.dureeMin} min
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {e.score != null && <Badge couleur="violet">Score {e.score}</Badge>}
                <Badge couleur={e.statut === "termine" ? "turquoise" : "jaune"}>
                  {e.statut === "termine" ? "Terminée" : "En cours"}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}