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
          variant === "default" && "bg-pink-500 text-white hover:bg-pink-600",
          variant === "secondary" && "bg-pink-100 text-pink-500 hover:bg-pink-200",
          variant === "ghost" && "text-pink-500 hover:bg-pink-50",
          className
        )}
        {...props}
      />
    );
  }
);

IOSButton.displayName = "IOSButton";

export { IOSButton };