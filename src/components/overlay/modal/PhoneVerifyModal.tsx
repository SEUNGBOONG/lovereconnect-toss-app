import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@toss/tds-mobile";
import { Phone, X } from "lucide-react";

import { useOverlay } from "../../../hooks/useOverlay";
import { useSendPhoneCode, useVerifyPhoneCode } from "../../../hooks/usePhoneAuth";

interface PhoneVerifyModalProps {
  phoneNumber: string;
  onVerified?: () => void;
}

export default function PhoneVerifyModal({ phoneNumber, onVerified }: PhoneVerifyModalProps) {
  const { closeOverlay } = useOverlay();

  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { mutateAsync: sendCode, isPending: isSending } = useSendPhoneCode();
  const { mutateAsync: verifyCode, isPending: isVerifying } = useVerifyPhoneCode();

  const handleVerify = async () => {
    if (!code.trim()) {
      toast.error("인증번호를 입력해주세요.");
      return;
    }

    try {
      const res = await verifyCode({
        phoneNumber,
        verificationCode: code,
      });

      if (res.success) {
        toast.success("휴대폰 인증 완료");
        onVerified?.();
        closeOverlay();
      } else {
        toast.error(res.message ?? "인증번호가 올바르지 않습니다.");
      }
    } catch {
      toast.error("인증에 실패했습니다.");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      await sendCode({ phoneNumber });
      setCooldown(30);
      setCode("");

      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      toast.error("재전송에 실패했습니다.");
    }
  };

  return (
    <div className="relative flex flex-col items-center text-center">
      {/* 닫기 버튼 */}
      <button
        onClick={closeOverlay}
        className="absolute right-0 top-0 rounded-full p-2 text-gray-400 hover:bg-gray-100"
      >
        <X size={20} />
      </button>

      <Phone size={40} className="mb-3 text-main-pink" />

      <h2 className="text-base font-semibold text-gray-900">인증번호를 입력해주세요</h2>

      <p className="mb-5 mt-1 text-sm text-gray-500">{phoneNumber}</p>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
        inputMode="numeric"
        maxLength={6}
        className="mb-5 h-12 w-full rounded-xl border border-gray-300 text-center text-lg focus:border-main-pink focus:outline-none"
      />

      <div className="flex w-full flex-col gap-2">
        <Button color="primary" display="block" loading={isVerifying} onClick={handleVerify}>
          인증번호 확인
        </Button>

        <Button
          variant="weak"
          display="block"
          disabled={isSending || cooldown > 0}
          onClick={handleResend}
        >
          {cooldown > 0 ? `재전송 ${cooldown}초` : "인증번호 재전송"}
        </Button>
      </div>
    </div>
  );
}
