import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import Login from "../pages/Login";

// Espace parent
import ParentDashboard from "../pages/parent/ParentDashboard";
import ParentEnfants from "../pages/parent/ParentEnfants";
import ParentEvaluations from "../pages/parent/ParentEvaluations";
import ParentRapports from "../pages/parent/ParentRapports";
import ParentRecommandations from "../pages/parent/ParentRecommandations";
import ParentProgression from "../pages/parent/ParentProgression";

// Espace enfant
import EnfantDashboard from "../pages/enfant/EnfantDashboard";
import EnfantQuestionnaires from "../pages/enfant/EnfantQuestionnaires";
import EnfantScenarios from "../pages/enfant/EnfantScenarios";
import EnfantJeux from "../pages/enfant/EnfantJeux";
import EnfantHistorique from "../pages/enfant/EnfantHistorique";

// Espace admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminQuestionnaires from "../pages/admin/AdminQuestionnaires";
import AdminScenarios from "../pages/admin/AdminScenarios";
import AdminJeux from "../pages/admin/AdminJeux";
import AdminBadges from "../pages/admin/AdminBadges";
import AdminRecommandations from "../pages/admin/AdminRecommandations";
import AdminUtilisateurs from "../pages/admin/AdminUtilisateurs";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Espace parent */}
        <Route element={<ProtectedRoute roleRequis="parent" />}>
          <Route element={<AppLayout />}>
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="/parent/enfants" element={<ParentEnfants />} />
            <Route path="/parent/evaluations" element={<ParentEvaluations />} />
            <Route path="/parent/rapports" element={<ParentRapports />} />
            <Route path="/parent/recommandations" element={<ParentRecommandations />} />
            <Route path="/parent/progression" element={<ParentProgression />} />
          </Route>
        </Route>

        {/* Espace enfant */}
        <Route element={<ProtectedRoute roleRequis="enfant" />}>
          <Route element={<AppLayout />}>
            <Route path="/enfant" element={<EnfantDashboard />} />
            <Route path="/enfant/questionnaires" element={<EnfantQuestionnaires />} />
            <Route path="/enfant/scenarios" element={<EnfantScenarios />} />
            <Route path="/enfant/jeux" element={<EnfantJeux />} />
            <Route path="/enfant/historique" element={<EnfantHistorique />} />
          </Route>
        </Route>

        {/* Espace administrateur */}
        <Route element={<ProtectedRoute roleRequis="administrateur" />}>
          <Route element={<AppLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/questionnaires" element={<AdminQuestionnaires />} />
            <Route path="/admin/scenarios" element={<AdminScenarios />} />
            <Route path="/admin/jeux" element={<AdminJeux />} />
            <Route path="/admin/badges" element={<AdminBadges />} />
            <Route path="/admin/recommandations" element={<AdminRecommandations />} />
            <Route path="/admin/utilisateurs" element={<AdminUtilisateurs />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}