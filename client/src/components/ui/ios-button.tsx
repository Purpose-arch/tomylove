import { cn } from "@/lib/utils";
import { Button } from "./button";
import { forwardRef } from "react";

export interface IOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const IOSButton = forwardRef<HTMLButtonElement, IOSButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "rounded-full font-medium",
          variant === "default" && "bg-[#007AFF] text-white hover:bg-[#0071E3]",
          variant === "secondary" && "bg-[#F2F2F7] text-[#007AFF] hover:bg-[#E5E5EA]",
          variant === "ghost" && "text-[#007AFF] hover:bg-[#F2F2F7]",
          className
        )}
        {...props}
      />
    );
  }
);

IOSButton.displayName = "IOSButton";

export { IOSButton };