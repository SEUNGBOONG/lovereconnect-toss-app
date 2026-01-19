"use client";

import { useNavigate } from "react-router-dom";

export default function FloatingButtons() {
  const navigate = useNavigate();
  const OPEN_CHAT_URL = import.meta.env.VITE_KAKAO_OPEN_CHAT;

  const buttonClass = `
    flex h-10 flex-1 items-center justify-center
    rounded-xl border border-gray-200
    bg-white text-sm font-medium text-gray-600
    transition-colors
    active:bg-main-pink active:text-white active:border-main-pink
  `;

  return (
    <div className="fixed inset-x-0 bottom-4 z-20 px-4">
      <div className="mx-auto flex max-w-md gap-3">
        <button
          className={buttonClass}
          onClick={() => {
            if (OPEN_CHAT_URL) {
              window.open(OPEN_CHAT_URL, "_blank");
            }
          }}
        >
          문의하기
        </button>

        <button className={buttonClass} onClick={() => navigate("/privacy-safe")}>
          개인정보 보호
        </button>

        <button className={buttonClass} onClick={() => navigate("/service-guide")}>
          서비스 안내
        </button>
      </div>
    </div>
  );
}
