import { Controller, useFormContext } from "react-hook-form";
import { Text } from "@toss/tds-mobile";

import { MBTI_LIST } from "../../constants/mbtiList.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select.tsx";

export type MbtiValue = (typeof MBTI_LIST)[number];

interface MbtiDropdownProps {
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function MbtiDropdown({
  name = "mbti",
  label = "MBTI",
  placeholder = "MBTI를 선택하세요",
  disabled = false,
  className = "",
}: MbtiDropdownProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors?.[name]?.message as string | undefined;

  return (
    <div className={`w-full ${className}`}>
      <Text color="neutralWeak" className="mb-2 block">
        {label}
      </Text>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            key={field.value ?? "empty"}
            value={field.value}
            onValueChange={(v) => field.onChange(v as MbtiValue)}
            disabled={disabled}
          >
            <SelectTrigger
              id={name}
              className={`w-full rounded-lg px-4 py-3 text-sm outline-none ring-0 focus:outline-none focus:ring-0 ${error ? "border-red-500" : "border-gray-300"} `}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>MBTI</SelectLabel>
                {MBTI_LIST.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
