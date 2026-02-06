import { appLogin } from "@apps-in-toss/web-framework";
import { Button } from "@toss/tds-mobile";
import { useState } from "react";
import { Heart } from "lucide-react";

import { API } from "../../../../lib/api/endpoints";

export default function TossLoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async () => {
    // 🔒 로딩 중 재클릭 완전 차단
    if (loading) {
      alert("이미 로그인 시도 중입니다.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);

      // 1️⃣ 토스 앱 로그인
      const { authorizationCode, referrer } = await appLogin();

      alert("[appLogin 성공]\n" + JSON.stringify({ authorizationCode, referrer }, null, 2));

      // 2️⃣ 서버 요청
      const url = `${import.meta.env.VITE_API_BASE_URL}${API.MEMBER.TOSS_LOGIN}`;

      alert("[서버 요청 시작]\n" + url);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ authorizationCode, referrer }),
      });

      alert("[서버 응답 수신]\nstatus = " + res.status);

      const text = await res.text();

      alert("[서버 응답 본문]\n" + text);

      // ❗ 실패 시: 절대 이동하지 않음
      if (!res.ok) {
        setErrorMsg("로그인에 실패했어요.\n다시 로그인 버튼을 눌러 처음부터 진행해주세요.");
        return;
      }

      // ❗ 성공이어도 여기서는 이동/상태 변경 안 함
      alert("로그인 성공 응답을 받았지만, 이 페이지에서는 이동하지 않습니다.");
    } catch (err) {
      alert("[예외 발생]\n" + (err instanceof Error ? err.message : String(err)));
      setErrorMsg("로그인 중 문제가 발생했어요.\n다시 로그인 버튼을 눌러 재시도해주세요.");
    } finally {
      setLoading(false);
      alert("[로그인 시도 종료]");
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col px-4">
      {/* 상단 콘텐츠 */}
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center text-center">
        {/* ❤️ Heart animation */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 flex animate-heart-pulse items-center justify-center">
              <Heart className="h-9 w-9 fill-main-pink opacity-60" stroke="none" />
            </div>
            <Heart className="h-8 w-8 fill-main-pink" stroke="none" />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">
          토스로 간편하게 로그인하고
          <br />
          서비스를 이용해보세요
        </p>

        {errorMsg && <p className="mt-4 whitespace-pre-line text-xs text-red-500">{errorMsg}</p>}
      </div>

      {/* 하단 CTA */}
      <div className="mx-auto w-full max-w-sm pb-8">
        <Button
          size="large"
          display="block"
          loading={loading}
          disabled={loading}
          className="!h-12 !rounded-xl"
          onClick={handleLogin}
        >
          {errorMsg ? "다시 로그인하기" : "토스로 로그인하고 시작하기"}
        </Button>
      </div>
    </main>
  );
}
