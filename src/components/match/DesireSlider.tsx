import { Controller, useFormContext } from "react-hook-form";
import { Slider } from "../ui/slider.tsx";

interface Props {
  name: string;
  label: string;
}

export function DesireSlider({ name, label }: Props) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        defaultValue={50}
        render={({ field }) => (
          <>
            <Slider
              value={[field.value ?? 50]}
              max={100}
              step={1}
              onValueChange={(v) => field.onChange(v[0])}
            />
            <span className="text-sm text-gray-500">{field.value ?? 50} / 100</span>
          </>
        )}
      />
    </div>
  );
}
