/* -------------------------------------------------------------------------- */
/* ----------------------------- PopAnimatedText ------------------------------- */
/* -------------------------------------------------------------------------- */

interface StyledRange {
  target: string; // 강조할 글자 또는 단어(현재는 글자 단위 매칭)
  className: string;
}

interface PopAnimatedTextProps {
  texts: string[]; // 줄마다 배열로 전달 (줄바꿈 처리 용이)
  className?: string;
  charDelay?: number; // (참고) stagger 값은 부모에서 제어하므로 여기선 사용 X
  styledRanges?: StyledRange[];
  scope: React.RefObject<HTMLHeadingElement>; // useAnimate()에서 받은 scope를 전달
}

/**
 * PopAnimatedText
 * - 각 글자를 <span>으로 만들고 초기 스타일(숨김, 아래로 이동, blur) 적용
 * - 실제 애니메이션은 외부(부모)에서 useAnimate로 제어
 */
export function PopAnimatedText({
  texts,
  className = "",
  styledRanges = [],
  scope,
}: PopAnimatedTextProps) {
  const getCharClass = (char: string) => {
    const match = styledRanges.find((s) => s.target === char);
    return match ? match.className : "";
  };

  return (
    // scope를 ref로 전달 (useAnimate에서 반환된 ref)
    <h1 ref={scope} className={className}>
      {texts.map((line, lineIndex) => (
        <p key={lineIndex}>
          {line.split("").map((char, i) => (
            <span
              key={i}
              // 애니메이션은 부모가 담당하므로 여기선 초기 스타일만 지정
              style={{
                display: "inline-block",
                opacity: 0,
                transform: "translateY(30px)",
                filter: "blur(4px)",
              }}
              className={getCharClass(char)}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      ))}
    </h1>
  );
}
