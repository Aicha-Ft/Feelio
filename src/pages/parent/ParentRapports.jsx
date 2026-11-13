import { useEffect, useState } from "react";
import { FileText, Lightbulb } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import SectionTitle from "../../components/common/SectionTitle";
import { formatDate } from "../../utils/format";

export default function ParentRapports() {
  const [rapports, setRapports] = useState([]);

  useEffect(() => {
    mockApi.getRapports().then(setRapports);
  }, []);

  return (
    <div className="space-y-6">
      <SectionTitle title="Rapports d'observation" subtitle="Générés par l'IA (données fictives)" />
      <div className="grid gap-4">
        {rapports.map((r) => (
          <Card key={r.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jaune/25 text-yellow-800">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="font-bold text-encre">{r.titre}</p>
                  <p className="text-xs text-black/50">{formatDate(r.date)}</p>
                </div>
              </div>
              <Badge couleur={r.statut === "termine" ? "turquoise" : "jaune"}>
                {r.statut === "termine" ? "Terminé" : "En cours"}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-black/70">{r.resume}</p>
            {r.recommandations?.length > 0 && (
              <div className="mt-3 rounded-xl bg-black/[0.03] p-3">
                <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-black/60">
                  <Lightbulb size={12} /> Recommandations
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-black/70">
                  {r.recommandations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}