import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@toss/tds-mobile";

interface NormalInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
}

export const NormalInput = ({ name, label, placeholder, type = "text" }: NormalInputProps) => {
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
        <TextField
          {...field}
          variant="box"
          label={label}
          labelOption="sustain"
          placeholder={placeholder}
          type={type}
          hasError={Boolean(errorMessage)}
          help={errorMessage ?? null}
        />
      )}
    />
  );
};
