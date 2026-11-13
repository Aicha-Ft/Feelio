import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Compass,
  Gamepad2,
  Award,
  Lightbulb,
  Users,
} from "lucide-react";

const liens = [
  { to: "/admin", label: "Statistiques", icon: LayoutDashboard, end: true },
  { to: "/admin/questionnaires", label: "Questionnaires", icon: ClipboardList },
  { to: "/admin/scenarios", label: "Scénarios", icon: Compass },
  { to: "/admin/jeux", label: "Mini-jeux", icon: Gamepad2 },
  { to: "/admin/badges", label: "Badges", icon: Award },
  { to: "/admin/recommandations", label: "Recommandations", icon: Lightbulb },
  { to: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
];

export default function AdminSidebar({ onNavigate }) {
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
                ? "bg-corail/15 text-red-700"
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