import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils.ts";
import { Label } from "../ui/label.tsx";

interface GenderSelectProps {
  name: string;
  label?: string;
}

export const GenderSelect = ({ name, label = "성별" }: GenderSelectProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selected = watch(name);
  const error = errors[name]?.message as string | undefined;

  const handleSelect = (value: "MALE" | "FEMALE") => {
    setValue(name, value, { shouldValidate: true });
  };

  const baseButton =
    "flex-1 rounded-md border px-4 py-2 text-sm font-medium outline-none ring-0 focus:outline-none focus:ring-0";

  const inactiveButton = "border-gray-300 bg-white text-gray-800";

  return (
    <div className="flex flex-col space-y-1">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleSelect("MALE")}
          className={cn(
            baseButton,
            selected === "MALE" ? "bg-main-pink border-main-pink text-white" : inactiveButton,
          )}
        >
          Male
        </button>

        <button
          type="button"
          onClick={() => handleSelect("FEMALE")}
          className={cn(
            baseButton,
            selected === "FEMALE" ? "bg-main-pink border-main-pink text-white" : inactiveButton,
          )}
        >
          Female
        </button>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      <input type="hidden" {...register(name)} />
    </div>
  );
};
