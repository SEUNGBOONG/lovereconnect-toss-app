import { useEffect } from "react";
import { useAnimate } from "framer-motion";

type AnimateFn = ReturnType<typeof useAnimate>[1];

interface LandingAnimationProps {
  animateH1: AnimateFn;
  animateDesc: AnimateFn;
  animateButtons: AnimateFn;
  descScope: React.RefObject<HTMLElement>;
  buttonsScope: React.RefObject<HTMLElement>;
}

export function useLandingAnimation({
  animateH1,
  animateDesc,
  animateButtons,
  descScope,
  buttonsScope,
}: LandingAnimationProps) {
  // 애니메이션 재생 순서 제어
  useEffect(() => {
    (async () => {
      // 1) h1 (글자별 stagger)
      await animateH1(
        "span",
        { opacity: 1, y: 0, filter: "blur(0px)" },
        { duration: 0.45, ease: "easeOut" },
      );

      await new Promise((r) => setTimeout(r, 120));

      // 2) 설명문
      if (descScope.current) {
        await animateDesc(
          descScope.current,
          { opacity: 1, y: 0 },
          { duration: 0.45, ease: "easeOut" },
        );
      }

      await new Promise((r) => setTimeout(r, 120));

      // 3) 버튼들
      if (buttonsScope.current) {
        await animateButtons(
          buttonsScope.current,
          { opacity: 1, y: 0 },
          { duration: 0.45, ease: "easeOut" },
        );
      }
    })();
  }, [animateH1, animateDesc, animateButtons, descScope, buttonsScope]);
}
