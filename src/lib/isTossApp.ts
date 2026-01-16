export function isTossApp() {
  return (
    typeof window !== "undefined" &&
    // 앱인토스 샌드박스 / 토스앱 공통
    (window.navigator.userAgent.includes("Toss") || window.location.protocol.startsWith("intoss"))
  );
}
