import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";

import { authAtom } from "../../atoms/authAtom";
import { useTossAdditionalInfo } from "../../hooks/useAuth";
import { toTossAdditionalInfoRequest } from "../../utils/toTossAdditionalInfoRequest";
import { NormalInput } from "./NormalInput";
import MbtiDropdown from "./MbtiDropdown";
import {
  tossAdditionalInfoSchema,
  type TossAdditionalInfoFormData,
} from "../../schemas/tossAdditionalInfoSchema";

export default function TossAdditionalInfoForm() {
  const methods = useForm<TossAdditionalInfoFormData>({
    resolver: zodResolver(tossAdditionalInfoSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      instagramId: "",
      mbti: "",
      tiktokId: "",
    },
  });

  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);
  const mutation = useTossAdditionalInfo();

  const onSubmit: SubmitHandler<TossAdditionalInfoFormData> = (data) => {
    const payload = toTossAdditionalInfoRequest(data);

    mutation.mutate(payload, {
      onSuccess: () => {
        setAuth({
          isLoggedIn: true,
          initialized: true,
          user: {
            nickname: data.nickname,
          },
        });

        navigate("/");
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-10">
        <section className="flex flex-col space-y-5">
          <NormalInput name="nickname" label="닉네임" placeholder="닉네임" />
          <NormalInput name="instagramId" label="인스타그램 ID" placeholder="instagramId" />
          <NormalInput name="tiktokId" label="틱톡 ID (선택)" placeholder="tiktokId" />
          <MbtiDropdown name="mbti" />
        </section>

        <Button
          type="submit"
          variant="fill"
          size="large"
          display="block"
          loading={mutation.isPending}
          disabled={mutation.isPending || !methods.formState.isValid}
          className="!h-12 !rounded-xl bg-main-pink"
        >
          추가 정보 입력 완료
        </Button>
      </form>
    </FormProvider>
  );
}
