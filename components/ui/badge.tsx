import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-crimson/10 text-crimson",
        secondary: "bg-cream-dark text-[#5C5650]",
        success: "bg-[#4A9B6F]/10 text-[#4A9B6F]",
        warning: "bg-[#D4A84B]/10 text-[#D4A84B]",
        outline: "border border-[#E5DDD4] text-[#5C5650]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
