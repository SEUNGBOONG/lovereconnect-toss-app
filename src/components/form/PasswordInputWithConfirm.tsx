import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { NormalInput } from "./NormalInput.tsx";

interface PasswordInputWithConfirmProps {
  passwordField: string;
  confirmField: string;
}

export const PasswordInputWithConfirm = ({
  passwordField,
  confirmField,
}: PasswordInputWithConfirmProps) => {
  const {} = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      {/* 비밀번호 */}
      <div className="relative">
        <NormalInput
          name={passwordField}
          label="비밀번호"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력하세요"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-7 flex items-center text-gray-500 transition-colors hover:text-gray-700"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {/* 비밀번호 확인 */}
      <div className="relative">
        <NormalInput
          name={confirmField}
          label="비밀번호 확인"
          type={showConfirm ? "text" : "password"}
          placeholder="비밀번호를 다시 입력하세요"
        />
        <button
          type="button"
          onClick={() => setShowConfirm((prev) => !prev)}
          className="absolute right-3 top-7 flex items-center text-gray-500 transition-colors hover:text-gray-700"
        >
          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};
