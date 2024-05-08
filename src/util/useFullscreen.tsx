import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, Flip);

export default function useFullscreen(
  ref: React.MutableRefObject<HTMLImageElement | null>,
  scope?: React.MutableRefObject<HTMLDivElement | null>,
  target?: string,
  overlayRef?: React.MutableRefObject<HTMLDivElement | null>
) {
  const [clicked, setClicked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const videoState = useRef<Flip.FlipState | null>(null);
  const overlayState = useRef<Flip.FlipState | null>(null);

  const onVideoClick = () => {
    videoState.current = Flip.getState(ref.current);

    if (overlayRef) {
      overlayState.current = Flip.getState(overlayRef.current, {
        props: "backgroundOpacity, backgroundColor, backdropFilter",
      });
    }
    setClicked(!clicked);
  };

  useGSAP(
    () => {
      if (!ref.current || !videoState.current) return;
      const tl = Flip.from(videoState.current, {
        ease: "expo.inOut",
        targets: target ? [target] : null,
        duration: 1,
      });

      if (overlayRef?.current && overlayState.current) {
        tl.add(
          Flip.from(overlayState.current, {
            ease: "expo.inOut",
            duration: 0.5,
          }),
          "<"
        );
      }
    },
    scope
      ? { dependencies: [clicked], scope: scope }
      : { dependencies: [clicked] }
  );

  return { clicked, completed, setCompleted, onVideoClick };
}
