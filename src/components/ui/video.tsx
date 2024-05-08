import { clsx } from "clsx";
import React, { useEffect, useRef, useState } from "react";
import useFullscreen from "../../util/useFullscreen";
import { Cross1Icon } from "@radix-ui/react-icons";
import { VideoOverlay } from "./imageOverlay";

interface VideoButtonProps extends React.ComponentPropsWithRef<"button"> {
  scroll: boolean;
  setScroll: React.Dispatch<React.SetStateAction<boolean>>;
  source: string;
  alt: string;
}

interface VideoImageProps extends React.ComponentPropsWithRef<"img"> {
  clicked: boolean;
}

const Video = React.forwardRef<HTMLButtonElement, VideoButtonProps>(
  ({ scroll, setScroll, className, source, alt, children, ...props }, ref) => {
    const videoRef = useRef<HTMLImageElement | null>(null);
    const [visible, setVisible] = useState(false);
    const { clicked, setCompleted, onVideoClick } = useFullscreen(videoRef);

    useEffect(() => {
      if (clicked) {
        setTimeout(() => {
          setVisible(clicked);
        }, 1000);
      } else {
        setVisible(clicked);
      }
    }, [clicked]);

    return (
      <>
        {visible && (
          <>
            <CloseButton
              onClick={() => {
                onVideoClick();
                setScroll(!scroll);
                setCompleted(false);
              }}
            />
            {children}
          </>
        )}
        <VideoOverlay
          clicked={clicked}
          handleClick={() => {
            onVideoClick();
            setScroll(!scroll);
          }}
          className={clsx(className, "flex-1 max-w-[50%] h-auto")}
          {...props}
          ref={ref}
        >
          <VideoImage
            clicked={clicked}
            ref={videoRef}
            src={source}
            alt={alt}
          ></VideoImage>
          <div
            className={clsx(
              clicked ? "invisible" : "hidden",
              "video-placeholder flex-1 w-[50%] h-full"
            )}
          ></div>
        </VideoOverlay>
      </>
    );
  }
);

const VideoImage = React.forwardRef<HTMLImageElement, VideoImageProps>(
  ({ clicked, className, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={clsx(
          "ytVideo h-full object-cover",
          clicked ? "fixed z-40 top-0 left-0 w-screen" : ""
        )}
        {...props}
      />
    );
  }
);

const CloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ ...props }) => {
  return (
    <button
      className="fixed top-5 left-1/2 z-[60] h-12 w-12 rounded-full bg-offwhite flex items-center justify-center"
      {...props}
    >
      <Cross1Icon className="flex-1 text-cblack" />
    </button>
  );
});

export { Video };
