import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import { Text } from "@toss/tds-mobile";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.tsx";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils.ts";

interface DatePickerInputProps {
  yearField: string;
  monthField: string;
  dayField: string;
  /** 🔑 검증용 필드 (예: "birthDate") */
  validateField: string;
  label?: string;
}

export function DatePickerInput({
  yearField,
  monthField,
  dayField,
  validateField,
  label = "생년월일",
}: DatePickerInputProps) {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const year = watch(yearField);
  const month = watch(monthField);
  const day = watch(dayField);

  const displayDate =
    year && month && day ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : "";

  const error = errors?.[validateField]?.message as string | undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const y = format(selectedDate, "yyyy");
    const m = format(selectedDate, "MM");
    const d = format(selectedDate, "dd");

    setValue(yearField, y, { shouldValidate: true });
    setValue(monthField, m, { shouldValidate: true });
    setValue(dayField, d, { shouldValidate: true });

    // 🔑 검증용 필드 채움
    setValue(validateField, "selected", { shouldValidate: true });
  };

  return (
    <div className="flex flex-col space-y-2.5">
      <Text color="neutralWeak" className="block">
        {label}
      </Text>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start rounded-lg px-4 py-3 text-left text-sm",
              "outline-none ring-0 focus:outline-none focus:ring-0",
              error ? "border-red-500" : "border-gray-300",
              !displayDate && "text-gray-400",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
            {displayDate || "날짜를 선택하세요"}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" sideOffset={12} className="rounded-2xl border p-5 shadow-xl">
          <Calendar
            mode="single"
            selected={displayDate ? new Date(displayDate) : undefined}
            onSelect={handleSelect}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* 검증용 hidden field */}
      <input
        type="hidden"
        {...register(validateField, {
          required: "생년월일을 선택해주세요.",
        })}
      />
    </div>
  );
}
