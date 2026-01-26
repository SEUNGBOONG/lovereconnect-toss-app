import { type ReactNode, useEffect } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "../atoms/authAtom.ts";
import { fetchMe } from "../lib/api/auth.ts";

export default function AuthBootstrap({ children }: { children: ReactNode }) {
  const setAuth = useSetAtom(authAtom);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await fetchMe();
        setAuth({
          isLoggedIn: true,
          user: res.data,
          initialized: true,
        });
      } catch {
        setAuth({
          isLoggedIn: false,
          user: null,
          initialized: true,
        });
      }
    };

    initAuth();
  }, [setAuth]);

  return <>{children}</>;
}
