import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const liens = [
  { to: "/parent", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/parent/enfants", label: "Mes enfants", icon: Users },
  { to: "/parent/evaluations", label: "Évaluations", icon: ClipboardList },
  { to: "/parent/rapports", label: "Rapports IA", icon: FileText },
  { to: "/parent/recommandations", label: "Recommandations", icon: Lightbulb },
  { to: "/parent/progression", label: "Progression", icon: TrendingUp },
];

export default function ParentSidebar({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {liens.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              isActive
                ? "bg-turquoise/15 text-turquoise-dark"
                : "text-black/60 hover:bg-black/5 hover:text-encre"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}