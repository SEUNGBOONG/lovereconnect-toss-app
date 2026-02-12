import { type ReactNode, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { fetchMe } from "../lib/api/auth";

export default function AuthBootstrap({ children }: { children: ReactNode }) {
  const auth = useAtomValue(authAtom);
  const setAuth = useSetAtom(authAtom);

  useEffect(() => {
    /**
     * 이미 로그인 + user 있음
     * - auth/me 호출 X
     * - initialized만 보장
     */
    if (auth.isLoggedIn && auth.user) {
      if (!auth.initialized) {
        setAuth((prev) => ({
          ...prev,
          initialized: true,
        }));
      }

      return;
    }

    /**
     * 이미 초기화된 경우
     */
    if (auth.initialized) {
      return;
    }

    const initAuth = async () => {
      try {
        const res = await fetchMe();

        setAuth({
          isLoggedIn: true,
          user: res.data,
          initialized: true,
        });
      } catch {
        /**
         * - auth/me 실패해도
         * - 기존 로그인 정보는 절대 변경하지 않음
         */
        setAuth((prev) => ({
          ...prev,
          initialized: true,
        }));
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
