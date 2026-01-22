import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox.tsx";
import { TermsContent } from "./TermsContent.tsx";

export const AgreementSection = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const privacyAgree = !!watch("privacyAgree");
  const useAgree = !!watch("useAgree");
  const emailAgree = !!watch("emailAgree");

  const isAllChecked = privacyAgree && useAgree && emailAgree;

  const [openTerm, setOpenTerm] = useState<"use" | "privacy" | null>(null);

  const handleAllConsentClick = () => {
    const next = !isAllChecked;
    setValue("privacyAgree", next, { shouldValidate: true });
    setValue("useAgree", next, { shouldValidate: true });
    setValue("emailAgree", next);
  };

  const handleCheckClick = (
    field: "privacyAgree" | "useAgree" | "emailAgree",
    checked: boolean,
  ) => {
    setValue(field, checked, { shouldValidate: true });
  };

  return (
    <section className="space-y-4 rounded-xl border bg-gray-50 p-4">
      {/* 전체 동의 */}
      <label className="flex cursor-pointer items-center gap-3">
        <Checkbox checked={isAllChecked} onCheckedChange={handleAllConsentClick} />
        <span className="text-sm font-semibold text-gray-900">약관 전체 동의</span>
      </label>

      <div className="h-px bg-gray-200" />

      {/* 이용약관 */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={useAgree}
              onCheckedChange={(v) => handleCheckClick("useAgree", v === true)}
            />
            <div>
              <p className="text-sm text-gray-900">
                이용약관 동의 <span className="text-main-pink">(필수)</span>
              </p>
              {errors.useAgree && (
                <p className="mt-1 text-xs text-red-500">{errors.useAgree.message as string}</p>
              )}
            </div>
          </label>

          <button
            type="button"
            onClick={() => setOpenTerm(openTerm === "use" ? null : "use")}
            className="flex items-center text-xs text-gray-400 hover:text-gray-600"
          >
            보기
            {openTerm === "use" ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
        </div>

        {openTerm === "use" && (
          <div className="rounded-lg border bg-white p-4">
            <TermsContent />
          </div>
        )}
      </div>

      {/* 개인정보 */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={privacyAgree}
              onCheckedChange={(v) => handleCheckClick("privacyAgree", v === true)}
            />
            <div>
              <p className="text-sm text-gray-900">
                개인정보 수집 및 이용 동의 <span className="text-main-pink">(필수)</span>
              </p>
              {errors.privacyAgree && (
                <p className="mt-1 text-xs text-red-500">{errors.privacyAgree.message as string}</p>
              )}
            </div>
          </label>

          <button
            type="button"
            onClick={() => setOpenTerm(openTerm === "privacy" ? null : "privacy")}
            className="flex items-center text-xs text-gray-400 hover:text-gray-600"
          >
            보기
            {openTerm === "privacy" ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
        </div>

        {openTerm === "privacy" && (
          <div className="rounded-lg border bg-white p-4">
            <TermsContent />
          </div>
        )}
      </div>

      {/* 마케팅 */}
      <label className="flex cursor-pointer items-start gap-3 pt-2">
        <Checkbox
          checked={emailAgree}
          onCheckedChange={(v) => handleCheckClick("emailAgree", v === true)}
        />
        <div>
          <p className="text-sm text-gray-700">
            마케팅 활용 및 이메일 수신 동의 <span className="text-gray-400">(선택)</span>
          </p>
          <p className="mt-1 text-xs text-gray-400">이벤트 및 서비스 안내를 받아볼 수 있어요</p>
        </div>
      </label>
    </section>
  );
};
