import React, { CSSProperties, useCallback, useRef } from "react";
import useFullscreen from "../../util/useFullscreen";
import { ImageOverlay } from "./imageOverlay";
import clsx from "clsx";

interface ImageSectionProps extends React.ComponentPropsWithoutRef<"img"> {
  containerStyle?: CSSProperties;
  overflowHidden: boolean;
  image: boolean;
  scroll: boolean;
  setScroll: React.Dispatch<React.SetStateAction<boolean>>;
  horizontal: boolean;
}

interface VideoImageProps extends React.ComponentPropsWithRef<"img"> {
  clicked: boolean;
  horizontal: boolean;
}

export function useMergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return useCallback(
    (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    },
    [refs]
  );
}

export const ImageSection = React.forwardRef<
  HTMLImageElement,
  ImageSectionProps
>(
  (
    {
      containerStyle,
      image,
      scroll,
      setScroll,
      overflowHidden,
      horizontal,
      children,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const mergedRefs = useMergeRefs<HTMLImageElement>([ref, imgRef]);

    const { clicked, onVideoClick } = useFullscreen(
      imgRef,
      containerRef,
      ".flip-img",
      overlayRef
    );

    return (
      <section
        className={clsx(
          overflowHidden ? "overflow-hidden" : "",
          "image-container h-[160vh] w-screen"
        )}
        ref={containerRef}
      >
        <div className="relative h-full w-full top-0 left-0">
          <div className="img-background h-[160vh]" style={containerStyle}>
            {image && !clicked && (
              <ImageOverlay
                clicked={clicked}
                handleClick={() => {
                  onVideoClick();
                  setScroll(!scroll);
                }}
              >
                {children}
                {!clicked && (
                  <Image
                    horizontal={horizontal}
                    clicked={clicked}
                    ref={mergedRefs}
                    {...props}
                  />
                )}
              </ImageOverlay>
            )}
          </div>
        </div>
        <div
          className={clsx(
            "img-placeholder fixed top-0 left-0 z-50 h-screen w-screen",
            clicked
              ? "visible bg-black bg-opacity-90 backdrop-blur-xl"
              : "invisible"
          )}
          ref={overlayRef}
        >
          {image && clicked && (
            <ImageOverlay
              clicked={clicked}
              handleClick={() => {
                onVideoClick();
                setScroll(!scroll);
              }}
            >
              {clicked && (
                <Image
                  horizontal={horizontal}
                  clicked={clicked}
                  ref={mergedRefs}
                  {...props}
                />
              )}
            </ImageOverlay>
          )}
        </div>
      </section>
    );
  }
);

const Image = React.forwardRef<HTMLImageElement, VideoImageProps>(
  ({ clicked, horizontal, className, ...props }, ref) => {
    const clickedStyle =
      "fixed z-50 top-0 left-1/2 h-screen w-auto object-cover";
    const unclickedStyle = horizontal
      ? "relative h-[160vh] w-auto object-cover"
      : "relative h-auto w-screen object-cover";
    return (
      <img
        ref={ref}
        className={clsx(className, clicked ? clickedStyle : unclickedStyle)}
        style={clicked ? { transform: "translate(-50%, 0)" } : {}}
        {...props}
      />
    );
  }
);
