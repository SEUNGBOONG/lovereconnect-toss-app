import { useAnimate } from "framer-motion";
import { ArrowRight, Heart, LogOut } from "lucide-react";
import { Button } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { useQueryClient } from "@tanstack/react-query";

import { authAtom } from "../../atoms/authAtom.ts";
import { useLandingAnimation } from "../../hooks/useLandingAnimation.ts";
import { useLogout } from "../../hooks/useAuth.ts";
import FloatingButtons from "../../components/layout/FloatingButtons/FloatingButtons.tsx";
import { PopAnimatedText } from "../../styles/PopAnimatedText.tsx";

export default function HomePage() {
  const queryClient = useQueryClient();
  const logout = useLogout();

  const { isLoggedIn, user } = useAtomValue(authAtom);

  const navigate = useNavigate();

  const [h1Scope, animateH1] = useAnimate();
  const [descScope, animateDesc] = useAnimate();
  const [buttonsScope, animateButtons] = useAnimate();

  useLandingAnimation({
    animateH1,
    animateDesc,
    animateButtons,
    descScope,
    buttonsScope,
  });

  return (
    <main className="relative min-h-screen w-full px-4 pb-28 pt-16">
      {/* 로그인 상태 표시 */}
      {isLoggedIn && user && (
        <div className="absolute right-4 top-4 flex items-center gap-1 text-xs text-gray-400">
          <button
            type="button"
            className="font-medium text-gray-600 hover:underline"
            // onClick={() => openMyPage()}
          >
            {user.nickname}
          </button>
          <span>님</span>

          <button
            onClick={() => {
              if (confirm("로그아웃 할까요?")) {
                logout.mutate();
                queryClient.clear();
              }
            }}
            className="ml-1 opacity-60 hover:opacity-100"
            aria-label="로그아웃"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* ❤️ Heart animation */}
        <div className="mb-10 flex items-center justify-center">
          <div className="relative flex h-10 w-10 items-center justify-center">
            {/* pulse wrapper */}
            <div className="absolute inset-0 flex animate-heart-pulse items-center justify-center">
              <Heart className="h-9 w-9 fill-main-pink opacity-60" stroke="none" />
            </div>

            {/* base heart */}
            <Heart className="h-8 w-8 fill-main-pink" stroke="none" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 w-full">
          <PopAnimatedText
            scope={h1Scope}
            texts={["다시 만나고 싶은", "사람이 있나요?"]}
            className="text-[2.1rem] font-extrabold leading-tight tracking-tight text-gray-900"
            styledRanges={[{ target: "사람", className: "text-main-pink" }]}
          />
        </div>

        {/* Description */}
        <p
          ref={descScope}
          style={{ opacity: 0, transform: "translateY(20px)" }}
          className="mb-12 max-w-[22rem] text-sm leading-relaxed text-gray-600"
        >
          가장 소중한 순간의 기억을
          <br />
          운명적인 재회로 이어드립니다.
        </p>

        {/* CTA */}
        <div
          ref={buttonsScope}
          style={{ opacity: 0, transform: "translateY(20px)" }}
          className="flex w-full flex-col gap-4"
        >
          {/* 메인 CTA */}
          <Button
            color="primary"
            variant="fill"
            size="large"
            display="block"
            className="!h-12 !rounded-xl"
            onClick={() => navigate(isLoggedIn ? "/match" : "/login")}
          >
            ✨ 다시 만나고 싶어요
            <ArrowRight className="ml-1 size-5" />
          </Button>

          {/* 중간 CTA – 배경 있는 버튼 유지 */}
          <Button
            color="primary"
            variant="weak"
            size="large"
            display="block"
            className="!h-12 !rounded-xl"
            onClick={() =>
              navigate(isLoggedIn ? "/attachment-test" : "/login?redirect=/attachment-test")
            }
          >
            ☁️ 내 애착 유형 알아보기
          </Button>

          <Button
            color="primary"
            variant="weak"
            size="large"
            display="block"
            className="!h-12 !rounded-xl"
            onClick={() => navigate("/posts")}
          >
            👥 커뮤니티 보기
          </Button>
        </div>
      </div>

      <FloatingButtons />
    </main>
  );
}
