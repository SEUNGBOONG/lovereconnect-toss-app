import { useFormContext, Controller } from "react-hook-form";

interface NormalTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export const NormalTextarea = ({ name, label, placeholder, rows = 12 }: NormalTextareaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col space-y-1.5">
          {/* label */}
          <label className="text-sm font-medium text-gray-700">{label}</label>

          {/* textarea */}
          <textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            className={[
              "w-full resize-none rounded-2xl px-5 py-4 text-sm text-gray-900",
              "border border-gray-300 bg-transparent outline-none",
              "transition-colors placeholder:text-gray-400",

              "focus:border-transparent focus:bg-gray-50 focus:ring-0",

              errorMessage && "border-red-500 focus:border-red-500 focus:bg-white",
            ]
              .filter(Boolean)
              .join(" ")}
          />

          {/* error */}
          {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
        </div>
      )}
    />
  );
};
