import React, { useRef } from "react";
import { H2, P } from "./typography";
import gsap from "gsap";
import clsx from "clsx";

interface SymptomCardProps extends React.ComponentPropsWithRef<"div"> {
  title: string;
}

const SymptomCard = React.forwardRef<HTMLDivElement, SymptomCardProps>(
  ({ title, children, className, ...props }, ref) => {
    const titleRef = useRef<HTMLDivElement | null>(null);

    const animation = gsap.to(titleRef.current, {
      yPercent: -100,
      ease: "power1.inOut",
      paused: true,
    });

    return (
      <div
        className={clsx("relative flex-1 overflow-hidden", className)}
        ref={ref}
        onMouseEnter={() => animation.play()}
        onMouseLeave={() => animation.reverse()}
        {...props}
      >
        <div
          className="flex absolute inset-0 z-30 justify-center items-center bg-offwhite"
          ref={titleRef}
        >
          <H2 className="font-bold m-0 text-cblack px-4">{title}</H2>
        </div>
        {children}
      </div>
    );
  }
);

const SymptomContent = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithRef<"p">
>(({ children, ...props }, ref) => {
  return (
    <div className="flex items-center justify-center min-h-72 bg-cblack">
      <P className="z-20 text-offwhite p-5" {...props} ref={ref}>
        {children}
      </P>
    </div>
  );
});

export { SymptomCard, SymptomContent };
