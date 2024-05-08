import {
  ArrowBottomLeftIcon,
  ArrowTopRightIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import useMouse from "../../util/useMouse";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";

interface ImageOverlayProps extends React.ComponentPropsWithRef<"div"> {
  clicked: boolean;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface VideoOverlayProps extends React.ComponentPropsWithRef<"button"> {
  clicked: boolean;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ImageOverlay = React.forwardRef<HTMLDivElement, ImageOverlayProps>(
  ({ clicked, handleClick, children, ...props }, ref) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => overlayRef.current as HTMLDivElement);

    //custom cursor
    const position = useMouse(overlayRef);
    const cursorButtonRef = useRef<HTMLButtonElement | null>(null);

    // useEffect(() => {
    //   console.log("overlay updated");
    // });

    useGSAP(
      () => {
        if (!cursorButtonRef) return;
        const xTo = gsap.quickTo(cursorButtonRef.current, "x", {
          duration: 0.2,
          ease: "power2.out",
        });
        const yTo = gsap.quickTo(cursorButtonRef.current, "y", {
          duration: 0.2,
          ease: "power2.out",
        });
        xTo(position.x);
        yTo(position.y);
      },
      { dependencies: [position.x, position.y] }
    );

    //hover effect
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
      if (position.inside) {
        setIsHovering(true);
        console.log("entered!");
      } else {
        setIsHovering(false);
        console.log("left!");
      }
    }, [position]);

    return (
      <div
        className="absolute top-0 left-0 h-[160vh] w-screen z-30"
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        ref={overlayRef}
        {...props}
      >
        {children}
        <button
          className={clsx(
            "fixed z-[99] flex justify-center items-center h-20 w-20 rounded-full top-0 left-0 text-black bg-white active:bg-red-500",
            isHovering ? "visible" : "invisible"
          )}
          style={{
            transform: "translate(-50%, -50%)",
          }}
          onClick={handleClick}
          ref={cursorButtonRef}
        >
          {clicked ? (
            <ArrowBottomLeftIcon className="h-10 w-10 font-bold" />
          ) : (
            <ArrowTopRightIcon className="h-10 w-10 font-black" />
          )}
        </button>
      </div>
    );
  }
);

const VideoOverlay = React.forwardRef<HTMLButtonElement, VideoOverlayProps>(
  ({ clicked, handleClick, children, className, ...props }, ref) => {
    return (
      <div className={clsx(className, "relative inline-block")}>
        <button
          onClick={handleClick}
          className={clsx(
            clicked ? "invisible" : "visible",
            "absolute inset-0 flex h-full w-full items-center justify-center z-20"
          )}
          ref={ref}
          {...props}
        >
          <PlayIcon className="h-40 w-40 font-bold text-white rounded-full border-10 border-white " />
        </button>
        {children}
      </div>
    );
  }
);

export { ImageOverlay, VideoOverlay };
