import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@toss/tds-mobile";
import { useSendPhoneCode } from "../../hooks/usePhoneAuth.ts";
import PhoneVerifyModal from "../overlay/modal/PhoneVerifyModal.tsx";
import { useOverlay } from "../../hooks/useOverlay.ts";
import { cn } from "../../lib/utils.ts";

interface PhoneInputProps {
  name: string;
  label: string;
  placeholder?: string;
  buttonText?: string;
  disabled?: boolean;
}

export const PhoneInput = ({
  name,
  label,
  placeholder,
  buttonText = "인증하기",
  disabled = false,
}: PhoneInputProps) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [isVerified, setIsVerified] = useState(false);

  const { mutate: sendPhoneCode, isPending } = useSendPhoneCode();
  const { openOverlay } = useOverlay();

  const error = errors[name]?.message as string | undefined;
  const canSend = !disabled && !error && !isVerified;

  const handleClick = () => {
    const value = getValues(name) as string;

    if (!value || error) {
      toast.error("올바른 전화번호를 입력해주세요.");
      return;
    }

    sendPhoneCode(
      { phoneNumber: value },
      {
        onSuccess: () => {
          openOverlay(
            "modal",
            <PhoneVerifyModal
              phoneNumber={value}
              onVerified={() => {
                setIsVerified(true);
                toast.success("휴대폰 인증이 완료되었습니다.");
              }}
            />,
          );
        },
      },
    );
  };

  return (
    <div className="flex flex-col space-y-1">
      {/* label */}
      <label htmlFor={name} className="text-sm font-medium text-gray-900">
        {label}
      </label>

      <div className="flex items-center gap-2">
        {/* input */}

        <input
          id={name}
          placeholder={placeholder}
          readOnly={isVerified}
          {...register(name)}
          className={cn(
            "flex-1 rounded-md border px-3 py-2 text-sm outline-none transition",
            isVerified && "bg-gray-100 text-gray-500",
            error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400",
          )}
        />

        {/* button */}
        {isVerified ? (
          <Button type="button" disabled variant="weak" size="small" className="!px-3">
            <span className="flex items-center gap-1 text-gray-600">
              <CheckCircle2 size={16} />
              인증완료
            </span>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleClick}
            disabled={!canSend || isPending}
            loading={isPending}
            variant="fill"
            size="small"
            className="!bg-main-pink"
          >
            {buttonText}
          </Button>
        )}
      </div>

      {/* error */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
