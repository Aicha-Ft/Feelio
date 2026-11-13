import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp doit être utilisé dans AppProvider");
  return ctx;
}