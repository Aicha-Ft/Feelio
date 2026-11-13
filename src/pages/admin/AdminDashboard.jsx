import { useEffect, useState } from "react";
import { Users, ClipboardList, Compass, Gamepad2, Award, Lightbulb, TrendingUp } from "lucide-react";
import { mockApi } from "../../services/mockApi";
import StatCard from "../../components/common/StatCard";
import Card from "../../components/common/Card";
import SectionTitle from "../../components/common/SectionTitle";
import Badge from "../../components/common/Badge";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    utilisateurs: 0,
    questionnaires: 0,
    scenarios: 0,
    jeux: 0,
    badges: 0,
    recommandations: 0,
  });

  useEffect(() => {
    Promise.all([
      mockApi.getUtilisateurs(),
      mockApi.getQuestionnaires(),
      mockApi.getScenarios(),
      mockApi.getJeux(),
      mockApi.getBadges(),
      mockApi.getRecommandations(),
    ]).then(([u, q, s, j, b, r]) => {
      setStats({
        utilisateurs: u.length,
        questionnaires: q.length,
        scenarios: s.length,
        jeux: j.length,
        badges: b.length,
        recommandations: r.length,
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-encre">Tableau de bord administrateur</h1>
        <p className="text-sm text-black/50">Vue d'ensemble de la plateforme Feelio.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Users} label="Utilisateurs" value={stats.utilisateurs} couleur="turquoise" />
        <StatCard icon={ClipboardList} label="Questionnaires" value={stats.questionnaires} couleur="violet" />
        <StatCard icon={Compass} label="Scénarios" value={stats.scenarios} couleur="jaune" />
        <StatCard icon={Gamepad2} label="Mini-jeux" value={stats.jeux} couleur="corail" />
        <StatCard icon={Award} label="Badges" value={stats.badges} couleur="turquoise" />
        <StatCard icon={Lightbulb} label="Recommandations" value={stats.recommandations} couleur="violet" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <SectionTitle title="Activité récente" subtitle="Dernières actions sur la plateforme" />
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-xl bg-black/[0.03] px-3 py-2">
              <span className="text-black/70">Nouvel utilisateur inscrit</span>
              <Badge couleur="turquoise">Aujourd'hui</Badge>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-black/[0.03] px-3 py-2">
              <span className="text-black/70">Questionnaire mis à jour</span>
              <Badge couleur="violet">Hier</Badge>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-black/[0.03] px-3 py-2">
              <span className="text-black/70">Nouveau badge créé</span>
              <Badge couleur="jaune">Il y a 2 jours</Badge>
            </li>
          </ul>
        </Card>

        <Card>
          <SectionTitle title="Répartition des rôles" subtitle="Utilisateurs par espace" />
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-black/60">Parents</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="h-2 rounded-full bg-black/5">
                <div className="h-full w-2/3 rounded-full bg-turquoise" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-black/60">Enfants</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="h-2 rounded-full bg-black/5">
                <div className="h-full w-full rounded-full bg-violet" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-black/60">Administrateurs</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="h-2 rounded-full bg-black/5">
                <div className="h-full w-1/3 rounded-full bg-corail" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}