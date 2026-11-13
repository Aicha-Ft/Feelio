import { createContext, useMemo, useState } from "react";
import { utilisateurs } from "../data/utilisateurs";
import { enfants } from "../data/enfants";

export const AuthContext = createContext(null);

const UTILISATEUR_DEFAUT = utilisateurs.find((u) => u.role === "parent") || utilisateurs[0];
const ENFANT_DEFAUT = enfants[0];

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(UTILISATEUR_DEFAUT);
  const [role, setRole] = useState(null); // 'parent' | 'enfant' | 'administrateur' | null
  const [enfantActifId, setEnfantActifId] = useState(ENFANT_DEFAUT.id);

  const enfantActif = useMemo(
    () => enfants.find((e) => e.id === enfantActifId) || ENFANT_DEFAUT,
    [enfantActifId]
  );

  const connexion = (roleChoisi) => {
    setRole(roleChoisi);
    if (roleChoisi === "administrateur") {
      const admin = utilisateurs.find((u) => u.role === "administrateur");
      if (admin) setUtilisateur(admin);
    } else if (roleChoisi === "parent") {
      const parent = utilisateurs.find((u) => u.role === "parent");
      if (parent) setUtilisateur(parent);
    } else if (roleChoisi === "enfant") {
      setEnfantActifId(ENFANT_DEFAUT.id);
    }
  };

  const deconnexion = () => setRole(null);

  const changerEnfantActif = (id) => {
    if (enfants.some((e) => e.id === id)) setEnfantActifId(id);
  };

  const value = {
    utilisateur,
    role,
    enfantActif,
    connexion,
    deconnexion,
    changerEnfantActif,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}