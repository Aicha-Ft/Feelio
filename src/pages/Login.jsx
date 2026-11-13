import { useNavigate } from "react-router-dom";
import { User, Baby, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const roles = [
  {
    id: "parent",
    titre: "Espace Parent",
    description: "Suivez la progression et consultez les rapports de vos enfants.",
    icon: User,
    couleur: "turquoise",
    route: "/parent",
    variant: "primary",
  },
  {
    id: "enfant",
    titre: "Espace Enfant",
    description: "Joue, découvre les émotions et gagne des badges.",
    icon: Baby,
    couleur: "violet",
    route: "/enfant",
    variant: "secondary",
  },
  {
    id: "administrateur",
    titre: "Espace Administrateur",
    description: "Gérez les contenus et consultez les statistiques.",
    icon: ShieldCheck,
    couleur: "corail",
    route: "/admin",
    variant: "corail",
  },
];

const couleursClasses = {
  turquoise: "bg-turquoise/15 text-turquoise-dark",
  violet: "bg-violet/15 text-violet-dark",
  corail: "bg-corail/20 text-red-700",
};

export default function Login() {
  const { connexion } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (role) => {
    connexion(role.id);
    navigate(role.route);
  };

  return (
    <div className="min-h-screen bg-creme">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black/60 shadow-sm">
            <Sparkles size={14} className="text-jaune" />
            Ressens, découvre, grandis !
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-encre md:text-4xl">
            Bienvenue sur <span className="text-turquoise">Feelio</span>
          </h1>
          <p className="mt-2 text-sm text-black/50 md:text-base">
            Choisissez un espace de démonstration pour explorer l'application.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card key={role.id} hover className="flex flex-col gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${couleursClasses[role.couleur]}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-encre">{role.titre}</h2>
                  <p className="mt-1 text-sm text-black/50">{role.description}</p>
                </div>
                <Button variant={role.variant} onClick={() => handleSelect(role)} className="mt-auto w-full">
                  Entrer
                </Button>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-black/40">
          Version de démonstration — pas d'authentification sécurisée.
        </p>
      </div>
    </div>
  );
}