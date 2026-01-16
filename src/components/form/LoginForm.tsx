import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@toss/tds-mobile";

import { NormalInput } from "./NormalInput";
import { type LoginFormData, loginSchema } from "../../schemas/memberSchema";
import { useLogin } from "../../hooks/useAuth";

export default function LoginForm() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        <NormalInput name="email" label="이메일" placeholder="example@mail.com" />

        <NormalInput name="password" label="비밀번호" type="password" placeholder="********" />

        <Button
          type="submit"
          color="primary"
          variant="fill"
          size="large"
          display="block"
          loading={isPending}
          disabled={!methods.formState.isValid}
        >
          로그인
        </Button>
      </form>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <Button
          color="primary"
          variant="weak"
          size="medium"
          display="block"
          onClick={() => {
            alert("회원가입은 다음 단계에서 연결");
          }}
        >
          아직 회원이 아니신가요? 회원가입하기
        </Button>
      </div>
    </FormProvider>
  );
}
