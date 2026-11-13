import { useEffect, useState } from "react";
import { TrendingUp, Award } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import Card from "../../components/common/Card";
import ProgressBar from "../../components/common/ProgressBar";
import SectionTitle from "../../components/common/SectionTitle";
import Avatar from "../../components/common/Avatar";
import Badge from "../../components/common/Badge";
import { useAuth } from "../../hooks/useAuth";
import { badges as badgesData } from "../../data/badges";

export default function ParentProgression() {
  const { utilisateur } = useAuth();
  const [progressions, setProgressions] = useState([]);
  const [enfantsData, setEnfantsData] = useState([]);

  useEffect(() => {
    Promise.all([mockApi.getProgressions(), mockApi.getEnfants()]).then(([p, e]) => {
      setProgressions(p);
      setEnfantsData(e);
    });
  }, []);

  const getBadge = (id) => badgesData.find((b) => b.id === id);
  const mesEnfants = enfantsData.filter((e) => utilisateur?.enfants?.includes(e.id));

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Progression"
        subtitle="Évolution des compétences émotionnelles de chaque enfant"
      />

      {mesEnfants.map((enfant) => {
        const p = progressions.find((x) => x.enfantId === enfant.id);
        if (!p) return null;

        return (
          <Card key={enfant.id}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Avatar nom={enfant.prenom} couleur={enfant.couleur} size="md" />
              <div className="flex-1">
                <p className="font-bold text-encre">{enfant.prenom}</p>
                <p className="text-xs text-black/50">
                  Niveau {enfant.niveau} · {enfant.points} points
                </p>
              </div>
              <TrendingUp size={18} className="text-turquoise-dark" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold text-encre">Compétences émotionnelles</p>
                <div className="space-y-3">
                  {p.competences.map((c) => (
                    <ProgressBar
                      key={c.nom}
                      value={c.valeur}
                      couleur={enfant.couleur}
                      label={c.nom}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-encre">Activité hebdomadaire</p>
                <div className="flex items-end justify-between gap-2 rounded-xl bg-black/[0.03] p-3">
                  {p.semaines.map((s) => (
                    <div key={s.semaine} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className={`w-full rounded-t-md bg-${enfant.couleur}`}
                        style={{ height: `${Math.max(10, s.points)}px` }}
                      />
                      <span className="text-[10px] font-semibold text-black/40">{s.semaine}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {enfant.badges?.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 flex items-center gap-1 text-sm font-semibold text-encre">
                  <Award size={14} /> Badges obtenus
                </p>
                <div className="flex flex-wrap gap-2">
                  {enfant.badges.map((bid) => {
                    const b = getBadge(bid);
                    if (!b) return null;
                    return (
                      <Badge key={bid} couleur={b.couleur}>
                        {b.nom}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}