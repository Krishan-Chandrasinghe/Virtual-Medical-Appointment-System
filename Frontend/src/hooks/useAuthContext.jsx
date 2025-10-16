import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) throw Error('useAuthContext hook must be use inside the AuthContextProvider!');

  return context;
}