import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white rounded-xl hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-sm",
        luxury:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.35)] hover:-translate-y-[1px]",
        outline:
          "border border-slate-200 bg-transparent text-slate-700 rounded-full hover:bg-slate-50 hover:border-slate-300 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:border-white/25",
        ghost:
          "text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white",
        destructive:
          "bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-sm",
        success:
          "bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-sm",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-sm",
        xl: "h-[52px] px-8 text-[15px]",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      const child = props.children as React.ReactElement<Record<string, unknown>>;
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          className: cn(buttonVariants({ variant, size, className }), child.props.className as string),
          ref,
          ...props,
        } as Record<string, unknown>);
      }
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
