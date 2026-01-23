import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils.ts";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="bg-primary/20 relative h-3 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className="absolute h-full bg-main-pink" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="border-primary/50 bg-background focus-visible:ring-ring block h-5 w-5 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = "Slider";

export { Slider };
