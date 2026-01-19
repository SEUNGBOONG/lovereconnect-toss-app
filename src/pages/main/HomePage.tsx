import { useAnimate } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";

import { authAtom } from "../../atoms/authAtom.ts";
import { useLandingAnimation } from "../../hooks/useLandingAnimation.ts";
import { PopAnimatedText } from "../../styles/PopAnimatedText.tsx";
import FloatingButtons from "../../components/layout/FloatingButtons/FloatingButtons.tsx";

export default function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAtomValue(authAtom);

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
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* ❤️ Heart animation */}
        <div className="mb-10 flex items-center justify-center">
          <div className="relative flex h-10 w-10 items-center justify-center">
            {/* pulse wrapper */}
            <div className="animate-heart-pulse absolute inset-0 flex items-center justify-center">
              <Heart className="fill-main-pink h-9 w-9 opacity-60" stroke="none" />
            </div>

            {/* base heart */}
            <Heart className="fill-main-pink h-8 w-8" stroke="none" />
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
