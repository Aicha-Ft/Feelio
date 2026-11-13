import { Link } from "react-router-dom";
import { Users, ClipboardList, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";
import SectionTitle from "../../components/common/SectionTitle";
import ProgressBar from "../../components/common/ProgressBar";
import Avatar from "../../components/common/Avatar";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import { enfants } from "../../data/enfants";

export default function ParentDashboard() {
  const { utilisateur } = useAuth();
  const mesEnfants = enfants.filter((e) => utilisateur?.enfants?.includes(e.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-encre">
          Bonjour {utilisateur?.nom?.split(" ")[0] || "Parent"}
        </h1>
        <p className="text-sm text-black/50">Voici un aperçu de la progression de vos enfants.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Enfants" value={mesEnfants.length} couleur="turquoise" />
        <StatCard icon={ClipboardList} label="Évaluations en cours" value="1" couleur="violet" />
        <StatCard icon={FileText} label="Rapports disponibles" value="3" couleur="jaune" />
        <StatCard icon={TrendingUp} label="Progression moyenne" value="52" suffix="%" couleur="corail" />
      </div>

      <div>
        <SectionTitle
          title="Mes enfants"
          subtitle="Suivez chaque profil individuellement"
          action={
            <Link to="/parent/enfants">
              <Button variant="outline" size="sm">
                Tout voir <ArrowRight size={14} />
              </Button>
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {mesEnfants.map((enfant) => (
            <Card key={enfant.id} hover>
              <div className="flex items-center gap-3">
                <Avatar nom={enfant.prenom} couleur={enfant.couleur} size="lg" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold text-encre">
                    {enfant.prenom}{" "}
                    <span className="text-sm font-normal text-black/40">· {enfant.age} ans</span>
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <Badge couleur={enfant.couleur}>Niveau {enfant.niveau}</Badge>
                    <Badge couleur="gris">{enfant.points} pts</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar value={enfant.progression} couleur={enfant.couleur} label="Progression globale" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <SectionTitle title="Derniers rapports IA" subtitle="Observations générées" />
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-xl bg-black/[0.03] px-3 py-2">
              <span className="text-black/70">Rapport — Léa</span>
              <Badge couleur="turquoise">Terminé</Badge>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-black/[0.03] px-3 py-2">
              <span className="text-black/70">Rapport — Noah</span>
              <Badge couleur="jaune">En cours</Badge>
            </li>
          </ul>
          <Link to="/parent/rapports" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-turquoise-dark hover:underline">
            Voir tous les rapports <ArrowRight size={14} />
          </Link>
        </Card>

        <Card>
          <SectionTitle title="Recommandations" subtitle="Conseils personnalisés" />
          <ul className="space-y-2 text-sm">
            <li className="rounded-xl bg-black/[0.03] px-3 py-2 text-black/70">
              Parler des émotions au dîner avec Léa.
            </li>
            <li className="rounded-xl bg-black/[0.03] px-3 py-2 text-black/70">
              Instaurer un rituel du soir pour Noah.
            </li>
          </ul>
          <Link to="/parent/recommandations" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-turquoise-dark hover:underline">
            Voir toutes les recommandations <ArrowRight size={14} />
          </Link>
        </Card>
      </div>
    </div>
  );
}