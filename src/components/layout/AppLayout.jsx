import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useApp } from "../../hooks/useApp";
import Topbar from "./Topbar";
import ParentSidebar from "./ParentSidebar";
import EnfantSidebar from "./EnfantSidebar";
import AdminSidebar from "./AdminSidebar";

export default function AppLayout() {
  const { role, enfantActif } = useAuth();
  const { sidebarMobileOuverte, setSidebarMobileOuverte } = useApp();

  const nomAffiche =
    role === "parent" ? "Claire Martin"
    : role === "enfant" ? enfantActif?.prenom
    : "Admin Feelio";

  const Sidebar =
    role === "parent" ? ParentSidebar
    : role === "enfant" ? EnfantSidebar
    : AdminSidebar;

  return (
    <div className="flex min-h-screen bg-creme">
      <aside className="hidden w-64 shrink-0 border-r border-black/5 bg-white lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="flex h-16 items-center gap-2 px-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-turquoise text-white font-black">F</span>
            <span className="text-lg font-extrabold tracking-tight text-encre">Feelio</span>
          </div>
          <Sidebar />
        </div>
      </aside>

      {sidebarMobileOuverte && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarMobileOuverte(false)} />
          <aside className="relative z-10 h-full w-64 bg-white shadow-xl">
            <div className="flex h-16 items-center gap-2 px-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-turquoise text-white font-black">F</span>
              <span className="text-lg font-extrabold tracking-tight text-encre">Feelio</span>
            </div>
            <Sidebar onNavigate={() => setSidebarMobileOuverte(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuToggle={() => setSidebarMobileOuverte(true)} nomAffiche={nomAffiche} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}