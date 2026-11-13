import { createContext, useState } from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [sidebarMobileOuverte, setSidebarMobileOuverte] = useState(false);
  return (
    <AppContext.Provider value={{ sidebarMobileOuverte, setSidebarMobileOuverte }}>
      {children}
    </AppContext.Provider>
  );
}