import React, { useEffect, useRef, useState } from "react";
import { H4 } from "./typography";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface AccordionRootProps extends React.ComponentPropsWithRef<"div"> {
  title: string;
}

interface AccordionProps extends React.ComponentPropsWithRef<"div"> {
  title: string;
  dark: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hovering: boolean;
}

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ title, children, className, ...props }, ref) => {
    const lightAccordionRef = useRef<HTMLDivElement | null>(null);
    const accordionRef = useRef<HTMLDivElement | null>(null);
    const accordionContentRef = useRef<HTMLDivElement | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [open, setOpen] = useState(false);
    const lightAnimation = useRef<GSAPTimeline>(
      gsap.timeline({ paused: true })
    );
    const openAnimation = useRef<GSAPTween | null>(null);

    useGSAP(() => {
      lightAnimation.current.add(
        gsap.to(lightAccordionRef.current, {
          xPercent: 100,
          ease: "expo.inOut",
          duration: 0.4,
        })
      );
      lightAnimation.current.add(
        gsap.to(accordionContentRef.current, {
          xPercent: -100,
          ease: "expo.inOut",
          duration: 0.4,
        }),
        "<"
      );
    });

    useEffect(() => {
      if (!lightAnimation.current || open) return;
      if (isHovering) {
        lightAnimation.current.play();
      } else {
        lightAnimation.current.reverse();
      }
    }, [isHovering]);

    useGSAP(() => {
      if (!accordionRef.current) return;
      openAnimation.current = gsap.to(accordionRef.current, {
        height: "auto",
        ease: "expo.inOut",
        duration: 0.4,
        paused: true,
      });
    });

    useEffect(() => {
      if (!openAnimation.current) return;
      if (open) {
        openAnimation.current.play();
      } else {
        openAnimation.current.reverse();
      }
    }, [open]);

    return (
      <div ref={ref} {...props}>
        <div
          className={clsx("overflow-hidden h-28 relative ", className)}
          ref={accordionRef}
          onMouseEnter={() => {
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        >
          <div
            className="absolute inset-0 z-30 w-full h-28 overflow-hidden"
            ref={lightAccordionRef}
          >
            <Accordion
              className="bg-offwhite"
              title={title}
              dark={false}
              open={open}
              setOpen={setOpen}
              hovering={isHovering}
              ref={accordionContentRef}
            >
              {children}
            </Accordion>
          </div>

          <Accordion
            title={title}
            dark={true}
            open={open}
            setOpen={setOpen}
            // ref={lightAccordionRef}
            hovering={isHovering}
          >
            {children}
          </Accordion>
        </div>
      </div>
    );
  }
);

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    { title, dark, open, setOpen, hovering, className, children, ...props },
    ref
  ) => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const animation = useRef<GSAPTween | null>(null);

    useGSAP(() => {
      if (!titleRef.current) return;
      animation.current = gsap.to(titleRef.current, {
        xPercent: 10,
        ease: "expo.inOut",
        duration: 0.4,
        paused: true,
      });
    });

    useEffect(() => {
      if (!animation.current || open) return;
      if (hovering) {
        animation.current.play();
      } else {
        animation.current.reverse();
      }
    });

    return (
      <div className={clsx(className, "overflow-hidden")} ref={ref} {...props}>
        <div
          className={clsx("w-screen", {
            "bg-coffee text-offwhite": dark,
          })}
        >
          <button className="w-full" onClick={() => setOpen(!open)}>
            <div className="flex mx-10 min-h-28 items-center justify-between">
              <H4 ref={titleRef}>{title}</H4>
              <H4>{open ? "↑" : "↓"}</H4>
            </div>
          </button>
          <div className="p-10">{children}</div>
        </div>
      </div>
    );
  }
);

export { AccordionRoot, Accordion };
