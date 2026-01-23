import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@toss/tds-mobile";
import { useMatchRequest, useMatchUpdate } from "../../hooks/useMatch.ts";
import { NormalInput } from "../form/NormalInput.tsx";
import { DesireSlider } from "./DesireSlider.tsx";
import { type MatchFormData, matchSchema } from "../../schemas/matchSchema.ts";

interface Props {
  mode: "create" | "edit";
  defaultValues?: MatchFormData;
}

export default function MatchRegisterForm({ mode, defaultValues }: Props) {
  const navigate = useNavigate();

  const methods = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    mode: "onChange",
    defaultValues: defaultValues ?? {
      targetName: "",
      targetPhone: "",
      targetInsta: "",
      requesterDesire: 50,
    },
  });

  const { mutate: requestMatch, isPending: isCreating } = useMatchRequest();
  const { mutate: updateMatch, isPending: isUpdating } = useMatchUpdate();

  const isPending = isCreating || isUpdating;

  const onSubmit: SubmitHandler<MatchFormData> = (data) => {
    if (mode === "edit") {
      updateMatch(data);
      navigate("/waiting");
      return;
    }

    requestMatch(data);
    navigate("/waiting");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-10">
        <h1 className="text-center text-2xl font-bold">
          {mode === "edit" ? "정보 수정" : "다시 만나고 싶은 사람"}
        </h1>

        <div className="border-main-pink/40 bg-main-pink/5 rounded-lg border px-4 py-3 text-sm text-gray-700">
          <p className="font-semibold text-main-pink">
            ⚠️ 입력 정보는 반드시 정확하게 작성해 주세요
          </p>
          <p className="mt-1 leading-relaxed">
            이름 · 전화번호 · 인스타그램 ID는
            <br />
            <span className="font-bold text-main-pink">
              단 한 글자라도 다르면 매칭되지 않습니다.
            </span>
          </p>
        </div>

        <section className="flex flex-col space-y-5">
          <NormalInput name="targetName" label="이름" />
          <NormalInput name="targetPhone" label="전화번호" />
          <NormalInput name="targetInsta" label="인스타그램 ID" />
          <DesireSlider name="requesterDesire" label="다시 만나고 싶은 마음" />
        </section>

        <Button
          color="primary"
          variant="fill"
          size="large"
          display="block"
          onClick={() => navigate("/match?mode=edit")}
          disabled={isPending}
        >
          {isPending ? "처리 중..." : mode === "edit" ? "수정하기" : "등록하기"}
        </Button>
      </form>
    </FormProvider>
  );
}
