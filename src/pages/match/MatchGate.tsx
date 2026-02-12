import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMatchInfo } from "../../hooks/useMatch";
import MatchRegisterForm from "../../components/match/MatchRegisterForm";

export default function MatchGate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isEditMode = searchParams.get("mode") === "edit";

  const { data: infoRes, isLoading, isFetching, isError } = useMatchInfo();

  const ready = !isLoading && !isFetching;
  const hasData = ready && !!infoRes?.data;
  const matched = hasData ? infoRes!.data.matched : undefined;

  /* ---------- FLOW ---------- */
  useEffect(() => {
    if (!ready || isError) return;

    if (hasData) {
      if (matched === true) {
        navigate("/success", { replace: true });
        return;
      }

      if (matched === false && !isEditMode) {
        navigate("/waiting", { replace: true });
        return;
      }
    }
  }, [ready, isError, hasData, matched, isEditMode, navigate]);

  /* ---------- UI ---------- */
  if (!ready) {
    return (
      <p className="mt-10 text-center text-sm text-gray-500">매칭 정보를 불러오는 중이에요...</p>
    );
  }

  if (!hasData) {
    return <MatchRegisterForm mode="create" />;
  }

  if (matched === false && isEditMode && infoRes?.data) {
    return <MatchRegisterForm mode="edit" defaultValues={infoRes.data} />;
  }

  if (isError) {
    return <p className="mt-10 text-center text-sm text-red-600">서버와 연결할 수 없습니다.</p>;
  }

  return null;
}
