import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

const roleLabel = {
  parent: "Espace Parent",
  enfant: "Espace Enfant",
  administrateur: "Espace Administrateur",
};

export default function Topbar({ onMenuToggle, nomAffiche }) {
  const { role, deconnexion } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    deconnexion();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-black/5 bg-white/80 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-black/60 hover:bg-black/5 lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-turquoise text-white font-black">F</span>
          <span className="text-lg font-extrabold tracking-tight text-encre">Feelio</span>
        </Link>
        {role && (
          <span className="hidden rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/60 sm:inline">
            {roleLabel[role]}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full bg-white px-2 py-1 sm:flex">
          <Avatar nom={nomAffiche || "Utilisateur"} size="sm" />
          <span className="max-w-[140px] truncate text-sm font-semibold text-encre">{nomAffiche}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-black/60 hover:bg-corail/10 hover:text-red-600"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Quitter</span>
        </button>
      </div>
    </header>
  );
}