import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@toss/tds-mobile";
import { type MemberFormData, memberSchema } from "../../schemas/memberSchema.ts";
import { useSignup } from "../../hooks/useAuth.ts";
import { NormalInput } from "./NormalInput.tsx";
import { PhoneInput } from "./PhoneInput.tsx";
import { PasswordInputWithConfirm } from "./PasswordInputWithConfirm.tsx";
import { GenderSelect } from "./GenderSelect.tsx";
import MbtiDropdown from "./MbtiDropdown.tsx";
import { DatePickerInput } from "./DatePickerInput.tsx";
import { toSignUpRequest } from "../../types/signup.ts";
import { AgreementSection } from "./AgreementSection.tsx";

export default function SignUpForm() {
  const methods = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "", // 검증용 필드
      gender: "MALE",
      instagramId: "",
      mbti: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      birthDate: "", // 검증용 필드
      privacyAgree: false,
      useAgree: false,
      emailAgree: false,
    },
  });

  const signUpMutation = useSignup();

  const onSubmit: SubmitHandler<MemberFormData> = (data) => {
    const payload = toSignUpRequest(data);
    signUpMutation.mutate(payload);
    console.log(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-10">
        {/* 기본 정보 */}
        <section className="flex flex-col space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <NormalInput name="name" label="이름" placeholder="홍길동" />
            <NormalInput name="nickname" label="닉네임" placeholder="둘리" />
          </div>

          <PhoneInput name="phoneNumber" label="연락처" placeholder="01012341234" />
        </section>

        {/* 이메일 + 비밀번호 */}
        <section className="flex flex-col space-y-5">
          <NormalInput name="email" label="이메일" placeholder="example@mail.com" />
          <PasswordInputWithConfirm passwordField="password" confirmField="passwordConfirm" />
        </section>

        {/* 기타 정보 */}
        <section className="flex flex-col space-y-5">
          <NormalInput name="instagramId" label="인스타그램 ID" placeholder="instagramId" />

          <GenderSelect name="gender" label="성별" />

          <MbtiDropdown name="mbti" />

          <DatePickerInput
            yearField="birthYear"
            monthField="birthMonth"
            dayField="birthDay"
            validateField="birthDate"
            label="생년월일"
          />
        </section>

        {/* 약관 */}
        <section className="flex flex-col space-y-3">
          <AgreementSection />
        </section>

        {/* 제출 */}
        <Button
          type="submit"
          variant="fill"
          size="large"
          display="block"
          loading={signUpMutation.isPending}
          disabled={signUpMutation.isPending}
          className="bg-main-pink !h-12 !rounded-xl"
        >
          회원가입
        </Button>
      </form>
    </FormProvider>
  );
}
