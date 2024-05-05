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
    console.log("videoState :", videoState.current);
    if (overlayRef) {
      overlayState.current = Flip.getState(overlayRef.current, {
        props: "backgroundOpacity, backgroundColor, backdropFilter",
      });
      console.log("overlayState :", overlayState.current);
    }
    setClicked(!clicked);
  };

  useGSAP(
    () => {
      if (!ref.current || !videoState.current) return;

      console.log("flip states: ", ref.current);
      console.log(videoState.current.elementStates[0]);

      console.log("ran!");

      const tl = Flip.from(videoState.current, {
        ease: "expo.inOut",
        targets: target ? [target] : null,
        duration: 1,
        onComplete: () => {
          console.log("flip completed!");
        },
      });

      if (overlayRef?.current && overlayState.current) {
        tl.add(
          Flip.from(overlayState.current, {
            ease: "expo.inOut",
            duration: 0.5,
            onComplete: () => {
              console.log("overlay flip completed!");
            },
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
