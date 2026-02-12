import type { TossAdditionalInfoFormData } from "../schemas/tossAdditionalInfoSchema";

export interface TossAdditionalInfoRequest {
  nickname: string;
  instagramId: string;
  mbti: string;
  tiktokId: string | null;
}

export const toTossAdditionalInfoRequest = (
  data: TossAdditionalInfoFormData,
): TossAdditionalInfoRequest => {
  return {
    nickname: data.nickname,
    instagramId: data.instagramId,
    mbti: data.mbti,
    tiktokId: data.tiktokId?.trim() ? data.tiktokId : null,
  };
};
