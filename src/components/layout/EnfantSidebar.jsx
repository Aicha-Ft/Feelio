import { NavLink } from "react-router-dom";
import { Home, Heart, Compass, Gamepad2, History } from "lucide-react";

const liens = [
  { to: "/enfant", label: "Mon coin", icon: Home, end: true },
  { to: "/enfant/questionnaires", label: "Mes questionnaires", icon: Heart },
  { to: "/enfant/scenarios", label: "Scénarios", icon: Compass },
  { to: "/enfant/jeux", label: "Mini-jeux", icon: Gamepad2 },
  { to: "/enfant/historique", label: "Mon historique", icon: History },
];

export default function EnfantSidebar({ onNavigate }) {
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
                ? "bg-violet/15 text-violet-dark"
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