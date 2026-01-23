import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMatchInfo } from "../../hooks/useMatch.ts";
import MatchRegisterForm from "../../components/match/MatchRegisterForm.tsx";

export default function MatchGate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isEditMode = searchParams.get("mode") === "edit";

  const { data: infoRes, isLoading, isFetching, isError, error } = useMatchInfo();

  const ready = !isLoading && !isFetching;

  const noRequest = ready && infoRes?.success === false && infoRes?.code === "MATCH_002";

  const hasInfo = ready && infoRes?.success === true && !!infoRes.data;

  const matched = hasInfo ? infoRes!.data.matched : undefined;

  useEffect(() => {
    if (!ready || isError) return;

    // 요청 없음 → 등록
    if (noRequest) return;

    // 요청 있음, 매칭 대기
    if (matched === false) {
      if (isEditMode) return;
      navigate("/waiting", { replace: true });
      return;
    }

    // 매칭 완료
    if (matched === true) {
      navigate("/success", { replace: true });
    }
  }, [ready, isError, noRequest, matched, isEditMode, navigate]);

  /* ---------- UI ---------- */

  if (!ready) {
    return (
      <p className="mt-10 text-center text-sm text-gray-500">매칭 정보를 불러오는 중이에요...</p>
    );
  }

  if (noRequest) {
    return <MatchRegisterForm mode="create" />;
  }

  if (matched === false && isEditMode && infoRes?.data) {
    return <MatchRegisterForm mode="edit" defaultValues={infoRes.data} />;
  }

  if (isError && error?.code !== "MATCH_002") {
    return (
      <p className="mt-10 text-center text-sm text-red-600">
        서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.
      </p>
    );
  }

  return null;
}
