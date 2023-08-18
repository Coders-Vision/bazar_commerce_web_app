import { cn } from "@/lib/utils";
import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

//One way of creating the component ??!!
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { children, className, type = "button", ...props }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) {
    return (
      <button
        className={cn(
          `
    w-auto
    rounded-full
    bg-black
    border-transparent
    px-5
    py-3
    disabled:cursor-not-allowed
    disabled:opacity-50
    text-white
    font-semibold
    hover:opacity-75
    transtion
    `,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, children, disabled, type = "button", ...props }, ref) => {
//     return <button ref={ref}>{children}</button>;
//   }
// );

// Button.displayName = "Button";
