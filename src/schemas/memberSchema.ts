import { z } from "zod";
import { errorMessages as e } from "../constants/errorMessages.ts";
import { MBTI_LIST } from "../constants/mbtiList.ts";

export const memberSchema = z
  .object({
    name: z.string().min(2, { message: e.name.min }),
    nickname: z.string().min(2, { message: e.nickname.min }),

    email: z.email({ message: e.email.invalid }),
    password: z.string().min(10, { message: e.password.min }),

    phoneNumber: z.string().regex(/^010\d{8}$/, { message: e.phoneNumber.invalid }),

    gender: z.enum(["MALE", "FEMALE"], { message: e.gender.required }),

    mbti: z.enum(MBTI_LIST, { message: e.mbti.required }),

    instagramId: z
      .string()
      .min(1, { message: e.instagramId.required })
      .regex(/^\S+$/, { message: e.instagramId.noSpace })
      .regex(/^[a-zA-Z0-9._]{1,30}$/, { message: e.instagramId.invalid })
      .refine(
        (v) => !v.startsWith(".") && !v.startsWith("_") && !v.endsWith(".") && !v.endsWith("_"),
        { message: e.instagramId.edgeDotUnderscore },
      ),

    birthYear: z
      .string()
      .nonempty({ message: e.birth.yearRequired })
      .regex(/^\d{4}$/, { message: e.birth.yearFormat }),

    birthMonth: z
      .string()
      .nonempty({ message: e.birth.monthRequired })
      .regex(/^(0[1-9]|1[0-2])$/, { message: e.birth.monthFormat }),

    birthDay: z
      .string()
      .nonempty({ message: e.birth.dayRequired })
      .regex(/^([0-2][0-9]|3[0-1])$/, { message: e.birth.dayFormat }),

    privacyAgree: z.boolean().refine((v) => v === true, { message: e.agreement.required }),
    useAgree: z.boolean().refine((v) => v === true, { message: e.agreement.required }),
    emailAgree: z.boolean().optional(),
  })
  .refine(
    (values) => {
      const { birthYear, birthMonth, birthDay } = values;

      // 조합된 날짜가 유효한지 체크
      const dateStr = `${birthYear}-${birthMonth}-${birthDay}`;
      const date = new Date(dateStr);

      const valid =
        !isNaN(date.getTime()) &&
        date.getFullYear().toString() === birthYear &&
        (date.getMonth() + 1).toString().padStart(2, "0") === birthMonth &&
        date.getDate().toString().padStart(2, "0") === birthDay;

      return valid;
    },
    {
      message: e.birth.invalidDate,
      path: ["birthDay"], // 여기 에러 표시
    },
  );

export type MemberFormData = z.infer<typeof memberSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: e.email.invalid }),
  password: z.string().min(1, { message: e.password.required }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
