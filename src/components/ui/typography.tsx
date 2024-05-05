import React, { useRef } from "react";
import { clsx } from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const P = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithRef<"p">
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      {...props}
      className={clsx(
        className,
        "lg:text-[1rem] 2xl:text-[1.5rem] text-[1rem] font-mono"
      )}
    >
      {children}
    </p>
  );
});

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithRef<"h1">
>(({ children, className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      {...props}
      className={clsx(
        className,
        "leading-[0.85] font-mono font-bold tracking-tight text-[11vw] text-center"
      )}
    >
      {children}
    </h1>
  );
});

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithRef<"h1">
>(({ children, className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      {...props}
      className={clsx(
        "text-[4rem] lg:text-[5rem] 2xl:text-[6rem] font-mono font-bold pt-[9vh] leading-none",
        className
      )}
    >
      {children}
    </h2>
  );
});

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithRef<"h1">
>(({ children, className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      {...props}
      className={clsx(
        className,
        "text-[2rem] lg:text-[3rem] font-mono font-semibold leading-normal"
      )}
    >
      {children}
    </h3>
  );
});

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithRef<"h1">
>(({ children, className, ...props }, ref) => {
  return (
    <h4
      ref={ref}
      {...props}
      className={clsx(
        className,
        "text-[1.5rem] lg:text-[2rem] font-mono font-semibold leading-normal"
      )}
    >
      {children}
    </h4>
  );
});

interface LinkProps extends React.ComponentPropsWithRef<"a"> {
  color: string;
}

const A = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ color, className, children, ...props }, _ref) => {
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const animation = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

    useGSAP(
      () => {
        if (!linkRef.current || !animation.current) return;
        animation.current.fromTo(
          ".underline-item",
          {
            width: "0%",
            left: "0%",
          },
          {
            width: "100%",
            duration: 0.3,
          }
        );

        animation.current.add("midway");

        animation.current.fromTo(
          ".underline-item",
          {
            width: "100%",
            left: "0%",
          },
          {
            width: "0%",
            left: "100%",
            duration: 0.3,
            immediateRender: false,
          }
        );
      },
      { scope: linkRef }
    );
    const handleMouseEnter = () => {
      if (animation.current) animation.current.tweenFromTo(0, "midway");
      console.log("mouse entered");
    };

    const handleMouseLeave = () => {
      if (animation.current) animation.current.play();
      console.log("mouse left");
    };

    return (
      <a
        ref={linkRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={clsx(
          className,
          `text-${color}`,
          "whitespace-nowrap h-fit w-fit"
        )}
        {...props}
      >
        <P className="relative h-fit w-fit">
          {children}
          <span
            className={clsx(
              `bg-${color}`,
              "underline-item block absolute bottom-0 left-0 w-0 h-[2px]"
            )}
          ></span>
        </P>
      </a>
    );
  }
);

const H1A = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ color, className, children, ...props }, _ref) => {
    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const animation = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

    useGSAP(
      () => {
        if (!linkRef.current || !animation.current) return;
        animation.current.fromTo(
          ".underline-item",
          {
            width: "0%",
            left: "0%",
          },
          {
            width: "100%",
            duration: 0.3,
          }
        );

        animation.current.add("midway");

        animation.current.fromTo(
          ".underline-item",
          {
            width: "100%",
            left: "0%",
          },
          {
            width: "0%",
            left: "100%",
            duration: 0.3,
            immediateRender: false,
          }
        );
      },
      { scope: linkRef }
    );
    const handleMouseEnter = () => {
      if (animation.current) animation.current.tweenFromTo(0, "midway");
      console.log("mouse entered");
    };

    const handleMouseLeave = () => {
      if (animation.current) animation.current.play();
      console.log("mouse left");
    };

    return (
      <a
        ref={linkRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={clsx(
          className,
          `text-${color}`,
          "whitespace-nowrap h-fit w-fit"
        )}
        {...props}
      >
        <H1 className="relative h-fit w-fit">
          {children}
          <span
            className={clsx(
              `bg-${color}`,
              "underline-item block absolute bottom--1 left-0 w-0 h-[1vh]"
            )}
          ></span>
        </H1>
      </a>
    );
  }
);

export { H1, H2, H3, H4, P, A, H1A };
