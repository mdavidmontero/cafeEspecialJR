import { PropsWithChildren, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { obtenerUsuarioPorId } from "../../actions/user.action";
import { LoadingScreen } from "../components/shared/LoadingScreen";
import { useAuthStore } from "../store/useAuthStore";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const checkStatus = onAuthStateChanged(auth, async (currentUser) => {
      try {
        const user = await obtenerUsuarioPorId(currentUser?.uid!);
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        throw new Error("Error al obtener el usuario");
      }
      setLoading(false);
      return () => checkStatus();
    });
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
