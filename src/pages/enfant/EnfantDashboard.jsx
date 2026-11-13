import { Link } from "react-router-dom";
import { Heart, Compass, Gamepad2, Award, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Card from "../../components/common/Card";
import Avatar from "../../components/common/Avatar";
import Badge from "../../components/common/Badge";
import ProgressBar from "../../components/common/ProgressBar";
import Button from "../../components/common/Button";
import { badges as badgesData } from "../../data/badges";

export default function EnfantDashboard() {
  const { enfantActif } = useAuth();
  if (!enfantActif) return null;

  const objectif = enfantActif.objectifHebdo || 5;
  const faites = enfantActif.activitesFaites || 0;
  const progressionObjectif = Math.min(100, (faites / objectif) * 100);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-turquoise/10 to-violet/10">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar nom={enfantActif.prenom} couleur={enfantActif.couleur} size="xl" />
          <div className="flex-1">
            <p className="flex items-center gap-1 text-sm font-semibold text-turquoise-dark">
              <Sparkles size={14} /> Bonjour {enfantActif.prenom} !
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-encre">Prêt(e) à explorer tes émotions ?</h1>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge couleur={enfantActif.couleur}>Niveau {enfantActif.niveau}</Badge>
              <Badge couleur="jaune">{enfantActif.points} points</Badge>
              <Badge couleur="gris">{enfantActif.badges.length} badges</Badge>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar
            value={progressionObjectif}
            couleur={enfantActif.couleur}
            label={`Objectif de la semaine : ${faites}/${objectif} activités`}
          />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/enfant/questionnaires">
          <Card hover className="h-full">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-corail/20 text-red-700">
                <Heart size={22} />
              </div>
              <div>
                <p className="font-bold text-encre">Mes questionnaires</p>
                <p className="text-xs text-black/50">Parle de ce que tu ressens</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/enfant/scenarios">
          <Card hover className="h-full">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-jaune/25 text-yellow-800">
                <Compass size={22} />
              </div>
              <div>
                <p className="font-bold text-encre">Scénarios</p>
                <p className="text-xs text-black/50">Vis des aventures</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/enfant/jeux">
          <Card hover className="h-full">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/15 text-violet-dark">
                <Gamepad2 size={22} />
              </div>
              <div>
                <p className="font-bold text-encre">Mini-jeux</p>
                <p className="text-xs text-black/50">Amuse-toi et gagne des points</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-encre">
            <Award size={18} className="text-jaune" /> Mes badges
          </h2>
          <Link to="/enfant/historique">
            <Button size="sm" variant="outline">
              Mon historique <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {badgesData.map((b) => {
            const obtenu = enfantActif.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center ${
                  obtenu ? "border-jaune/50 bg-jaune/10" : "border-black/5 bg-black/[0.02] opacity-50"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${b.couleur}/20`}>
                  <Award size={18} />
                </div>
                <p className="text-xs font-semibold text-encre">{b.nom}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}