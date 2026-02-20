import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMatchInfo } from "../../hooks/useMatch";
import MatchRegisterForm from "../../components/match/MatchRegisterForm";
import { useAtomValue } from "jotai";
import { authAtom } from "../../atoms/authAtom.ts";

export default function MatchGate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn, initialized } = useAtomValue(authAtom);

  const isEditMode = searchParams.get("mode") === "edit";

  const { data: infoRes, isLoading, isFetching, isError } = useMatchInfo(isLoggedIn);

  /* --------------------------
   * 로그인 리다이렉트
   * -------------------------- */
  useEffect(() => {
    if (initialized && !isLoggedIn) {
      navigate("/toss/login", { replace: true });
    }
  }, [initialized, isLoggedIn, navigate]);

  /* --------------------------
   * 매칭 상태 리다이렉트
   * -------------------------- */
  const ready = initialized && !isLoading && !isFetching;
  const hasData = ready && !!infoRes?.data;
  const matched = hasData ? infoRes!.data.matched : undefined;

  useEffect(() => {
    if (!ready || isError || !isLoggedIn) return;

    if (hasData) {
      if (matched === true) {
        navigate("/success", { replace: true });
      } else if (matched === false && !isEditMode) {
        navigate("/waiting", { replace: true });
      }
    }
  }, [ready, isError, hasData, matched, isEditMode, isLoggedIn, navigate]);

  /* --------------------------
   * UI
   * -------------------------- */

  if (!initialized) {
    return <p className="mt-10 text-center">로그인 상태 확인 중...</p>;
  }

  if (!isLoggedIn) {
    return null; // 리다이렉트 중
  }

  if (!ready) {
    return <p className="mt-10 text-center">매칭 정보 불러오는 중...</p>;
  }

  if (isError) {
    return <p className="mt-10 text-center text-red-500">서버 오류</p>;
  }

  if (!hasData) {
    return <MatchRegisterForm mode="create" />;
  }

  if (matched === false && isEditMode && infoRes?.data) {
    return <MatchRegisterForm mode="edit" defaultValues={infoRes.data} />;
  }

  return null;
}
