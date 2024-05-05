import { useContext, useImperativeHandle, useRef, useState } from "react";
import gsap from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { AllowScroll, Timeline, isImage } from "../App";
import { wrapW } from "../util/wrapWords";
import { ImageSection } from "../components/ui/ImageSection";
import saturnImage from "/images/Francisco_de_Goya,_Saturno_devorando_a_su_hijo_(1819-1823).jpg";
import React from "react";

gsap.registerPlugin(useGSAP, Flip);

interface Props {}

export type LandingRef = {
  initAnimation: () => void;
};

export const Landing = React.forwardRef<LandingRef, Props>((_props, ref) => {
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const tl = useContext(Timeline);
  const flipState = useRef<Flip.FlipState | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);

  const [hidden, setHidden] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scroll, setScroll } = useContext(AllowScroll);

  const { image, setImage } = useContext(isImage);

  const updateImageState = () => {
    flipState.current = Flip.getState(imageRef.current);
    console.log("current filp state: ");
    console.log(flipState.current);
    setImage(true);
  };

  const initAnimation = () => {
    const tl = gsap.timeline();
    tl.from(
      ".right-arrow",
      {
        xPercent: -300,
        duration: 2,
        ease: "expo.inOut",
      },
      "<"
    );
    tl.from(
      ".left-arrow",
      {
        xPercent: 300,
        duration: 2,
        ease: "expo.inOut",
        onComplete: updateImageState,
      },
      "<"
    );
  };

  useImperativeHandle(ref, () => ({
    initAnimation: initAnimation,
  }));

  useGSAP(
    () => {
      if (!textRef.current) return;

      tl.from(".title", {
        yPercent: 100,
        duration: 1.8,
        ease: "power4.out",
        stagger: 0.3,
      });
      tl.from(
        ".right-arrow",
        {
          xPercent: -300,
          duration: 2,
          ease: "expo.inOut",
        },
        "<"
      );
      tl.from(
        ".left-arrow",
        {
          xPercent: 300,
          duration: 2,
          ease: "expo.inOut",
          onComplete: updateImageState,
        },
        "<"
      );
      tl.play();
    },
    { dependencies: [image], revertOnUpdate: true, scope: textRef }
  );

  useGSAP(
    () => {
      console.log("started!!!!");
      if (imageRef.current) {
        // Assuming the elements have equal height or calculating total height

        tl.from(
          ".bar",
          {
            xPercent: -100,
            duration: 1.7,
            ease: "power3.inOut",
            onComplete: () => {
              tl.to(
                ".bar",
                {
                  xPercent: 100,
                  ease: "power3.inOut",
                  duration: 1.7,
                  scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                  },
                },
                ">"
              );
            },
          },
          "<"
        );

        console.log("ran1!");
        if (!flipState.current) return;
        tl.add(
          Flip.from(flipState.current, {
            ease: "power1.inOut",
            onStart: () => {
              setHidden(false);
            },
            onComplete: () => {
              setHidden(true);
            },
            targets: [".flip-img"],
            scrollTrigger: {
              onEnter: () => setHidden(false),
              onLeave: () => setHidden(true),
              onEnterBack: () => setHidden(false),

              trigger: ".hero",
              start: "-=10",
              end: "bottom top",
              scrub: 2.5,
              invalidateOnRefresh: true,
            },
          }),
          "<"
        );
        console.log("ran2!");
        if (!captionRef.current) return;
        const words = captionRef.current.children;
        tl.from(words, {
          yPercent: 300,
          duration: 2,
          stagger: 0.04,
          ease: "power3.inOut",

          scrollTrigger: {
            trigger: ".caption-container",
            start: "bottom bottom-=10",
          },
        });
        console.log("ran3!");
      }
    },
    { dependencies: [image], revertOnUpdate: false, scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      <section className="hero flex flex-col h-svh justify-between">
        <div className="nav-placeholder"></div>
        <div className="flex flex-row justify-center px-5">
          <h1
            ref={textRef}
            className="leading-[0.85] text-cblack font-mono font-bold tracking-tight flex flex-col text-[11vw] justify-center flex-wrap"
          >
            <div className="h-fit w-fit overflow-hidden">
              <div className="title flex flex-wrap leading-[0.85]">
                GOYA & TRAUMA
              </div>
            </div>
            <div className="flex justify-start items-center h-[10.3vw] pe-0 leading-[0.85]">
              <div>
                <span className="right-arrow inline-flex items-center">→</span>{" "}
                <div className="inline-flex overflow-hidden">
                  <span className="title">IN</span>
                </div>
              </div>
              {!image ? (
                <img
                  src={saturnImage}
                  alt="van gogh last painting"
                  className="flip-img object-cover h-1/2 z-20 mx-20 flex-1" //min-w-[60%]
                  ref={imageRef}
                  data-flip-id="img-flip"
                />
              ) : (
                <div className="h-1/2 mx-4 flex-1"></div>
              )}
              <div className="left-arrow">←</div>
            </div>
            <div className="overflow-hidden flex justify-start items-center leading-[0.85]">
              <p className="title">MENTAL HEALTH</p>
            </div>
          </h1>
        </div>
        <div className="overflow-hidden">
          <div className="bar h-[.05rem] w-screen bg-coffee justify-self-end mb-5"></div>
          <p className="text-sm text-cblack w-full font-mono text-right mb-3 pr-5">
            A Trauma-focused educational website.
          </p>
        </div>
      </section>

      <ImageSection
        ref={imageRef}
        image={image}
        scroll={scroll}
        setScroll={setScroll}
        overflowHidden={hidden}
        horizontal={false}
        src={saturnImage}
        alt="van gogh last painting"
        className="flip-img z-10" //w-[60%] h-4/6
        data-flip-id="img-flip"
      >
        <div className="caption-container absolute w-full h-full flex flex-col items-end justify-end z-30 overflow-hidden">
          <div
            ref={captionRef}
            className="text-sm font-mono text-offwhite mx-5 mb-5 lg:mb-10 lg:mr-10 z-20 flex flex-wrap overflow-hidden"
          >
            {wrapW("(Saturno devorando a su hijo), ")}
            {wrapW("Saturn Devouring His Son", "font-bold")}
            {wrapW(", 1819–1823 - Fransisco Goya.")}
          </div>
        </div>
      </ImageSection>
    </div>
  );
});

{
  /* <img
                  src="/images/Francisco_de_Goya,_Saturno_devorando_a_su_hijo_(1819-1823).jpg"
                  alt="van gogh last painting"
                  className="flip-img object-cover z-20 object-top w-full h-auto" //w-[60%] h-4/6
                  ref={imageRef}
                  data-flip-id="img-flip"
                /> */
}
