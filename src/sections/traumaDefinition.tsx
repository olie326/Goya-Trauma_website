import { useContext, useImperativeHandle, useRef } from "react";
import gsap from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { AllowScroll, Timeline, isImage } from "../App";
import { H1, H2, P } from "../components/ui/typography";
import { Seperator } from "./implications";
import { ImageSection } from "../components/ui/ImageSection";
import profileImage from "/images/Francisco_de_Goya.jpg";
import mujeresImage from "/images/Mujeres_riendo.jpg";
import React from "react";

gsap.registerPlugin(useGSAP);

export const TraumaDefinitionSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<"div">
>(({ className, ...props }, ref) => {
  const traumaDefinitionSectionRef = useRef<HTMLDivElement | null>(null);

  const suicideInContextRef = useRef<HTMLHeadingElement | null>(null);
  const imgRef2 = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const captionRef2 = useRef<HTMLParagraphElement | null>(null);
  const seperatorRef = useRef<HTMLDivElement>(null);

  const vulnerabilityRef = useRef<HTMLHeadingElement | null>(null);
  const headingWrapperRef = useRef<HTMLHeadingElement | null>(null);
  const circumRef = useRef<HTMLHeadingElement | null>(null);
  const dispositionRef = useRef<HTMLHeadingElement | null>(null);
  const tl = useContext(Timeline);

  const goyaRef = useRef<HTMLDivElement>(null);

  const { scroll, setScroll } = useContext(AllowScroll);

  const { image } = useContext(isImage);

  useImperativeHandle(
    ref,
    () => traumaDefinitionSectionRef.current as HTMLDivElement
  );

  useGSAP(
    () => {
      if (!suicideInContextRef.current) return;
      console.log(suicideInContextRef.current);

      tl.from(suicideInContextRef.current, {
        yPercent: 100,
        duration: 2,
        ease: "power3.in",
        scrollTrigger: {
          trigger: ".img-background",
          start: "bottom center+=500",
          end: "bottom top+=500",
          scrub: 1,
        },
      });
      tl.from(
        captionRef2.current,
        {
          yPercent: 400,
          duration: 1.7,
          stagger: 0.04,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "+=60%",
            scrub: 1,
          },
        },
        "<"
      );
    },
    { dependencies: [image], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.to(vulnerabilityRef.current, {
      xPercent: 50,
      scrollTrigger: {
        trigger: headingWrapperRef.current,
        start: "top bottom",

        scrub: true,
      },
    });
    gsap.to(circumRef.current, {
      xPercent: -50,
      scrollTrigger: {
        trigger: headingWrapperRef.current,
        start: "top bottom",

        scrub: true,
      },
    });
    gsap.to(dispositionRef.current, {
      xPercent: 50,
      scrollTrigger: {
        trigger: headingWrapperRef.current,
        start: "top bottom",

        scrub: true,
      },
    });
  });

  useGSAP(
    () => {
      if (!seperatorRef.current) return;
      gsap.from(".seperator", {
        xPercent: -100,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: seperatorRef.current,
          start: "bottom center+=300",
        },
      });
    },
    { scope: seperatorRef }
  );

  useGSAP(() => {
    if (!goyaRef.current) return;
    gsap.from(goyaRef.current.children, {
      yPercent: 100,
      ease: "power2.out",
      duration: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: goyaRef.current,
        start: "top center+=50",
      },
    });
  });

  return (
    <>
      <section
        className="trauma-page min-h-[160vh] w-screen border-y-[0.05rem] border-coffee"
        ref={traumaDefinitionSectionRef}
        {...props}
      >
        <div className="relative z-10 flex flex-col justify-center file:items-center">
          <div className="overflow-hidden px-3">
            <H2 className="mt-40 text-center" ref={suicideInContextRef}>
              WHAT EXACTLY <span className="italic text-clblue">IS </span>
              TRAUMA?
            </H2>
          </div>
          <div className="text-md font-mono text-coffee text-center whitespace-normal">
            In order to address{" "}
            <span className="font-bold text-cblack italic">trauma</span>,
            awareness in social, cultural, and individual context is key.
          </div>
          <div className="flex justify-center mt-20 gap-3 text-cblack">
            <div className="text-left max-w-xl">
              <P>
                Psychological trauma is when either a single event, several
                events, or an ongoing situation occurs such that it overwhelms a
                person so much so that they fail to process or manage their own
                emotions. In fact, this experience may even make the person feel
                like their life, safety, or sanity is at stake. Experts define
                it as{" "}
                <span className="font-bold">
                  "exposure to actual or threatened death, serious injury, or
                  sexual violence."
                </span>
              </P>
            </div>
            <div className="flex flex-col text-left max-w-xl">
              <P>
                The impact of trauma can vary greatly from person to person, and
                not everyone will react to the same situation in the same way.
                For instance, children may find the loss of a parent to be a
                great deal more traumatic than an adult. In other words, What is
                traumatic for one may not be traumatic for another.
              </P>
              <P className="my-1"></P>
            </div>
          </div>
          <div className="mt-[20vh] mb-[10vh]">
            <H1 ref={headingWrapperRef}>
              TRAUMA IS DEFINED FROM YOUR OWN{" "}
              <div className="flex justify-end overflow-hidden">
                <div
                  className="text-offwhite whitespace-nowrap bg-black"
                  ref={vulnerabilityRef}
                >
                  VULNERABILITY VULNERABILITY VULNERABILITY VULNERABILITY
                </div>
              </div>
              <div className="flex overflow-hidden">
                <div className="text-clblue whitespace-nowrap" ref={circumRef}>
                  CIRCUMSTANCE CIRCUMSTANCE CIRCUMSTANCE CIRCUMSTANCE
                </div>
              </div>
              <div className="flex justify-end overflow-hidden">
                <div
                  className="text-coffee whitespace-nowrap bg-black"
                  ref={dispositionRef}
                >
                  PREDISPOSITION PREDISPOSITION PREDISPOSITION PREDISPOSITION
                </div>
              </div>
            </H1>
          </div>
          <div className="w-screen overflow-hidden" ref={seperatorRef}>
            <Seperator />
          </div>
          <div
            className="flex flex-col justify-center my-[10vh] gap-3 lg:flex-row overflow-hidden"
            ref={goyaRef}
          >
            <img
              src={profileImage}
              alt="goya_portrait"
              className="goya-img object-scale-down max-h-[70vh] w-auto lg:max-w-[30%]"
            />
            <P className="goya-bio p-3 max-w-lg">
              <span className="font-bold text-xl">
                Francisco Goya (1746-1826)
              </span>{" "}
              was a Spanish painter who is widely considered to pioneer the
              modern art movement. He is particularly remembered for succumbing
              to an undiagnosed illness in 1793 which left him deaf. As a
              result, the subsequent paintings after his illness dealt with
              progressively darker themes. The paintings showcased througout
              this website are from a series of haunting works painted in
              solitude towards the end of Goya's life named "The Black
              Paintings".
              <P className="mt-3">
                Only through pure speculation, Goya's vulnerability may have
                possibly been his loss of hearing which in turn led to a decline
                in his mental health. On the other hand, perhaps his mystery
                illness was traumatic for him and losing his hearing was simply
                just the nail in the coffin.
              </P>
            </P>
          </div>
        </div>
      </section>
      <div ref={containerRef}>
        <ImageSection
          image={image}
          scroll={scroll}
          setScroll={setScroll}
          overflowHidden={true}
          ref={imgRef2}
          horizontal={false}
          src={mujeresImage}
          alt="atropos o las parcas"
          className="flip-img align-middle"
          data-flip-id="img-flip"
        >
          <div className="absolute top-0 left-0 max-w-[60vw] max-h-screen overflow-hidden z-30">
            <P
              ref={captionRef2}
              className="text-almost-white font-mono text-md p-5"
            >
              The Black Paintings are a collection of 14 paintings that Goya
              painted approximately from 1819 to 1823. They were painted
              directly onto the walls of his house while Goya was living in
              solitude towards the end of his life. In fact, paintings, or more
              correctly, the murals were never intended to be seen. They depict
              very disturbing themes possibly as a result of his declining
              mental health and overall outlook on life.
              <P className="mt-3">
                The painting shown below is named{" "}
                <span className="italic">(Dos mujeres y un hombre)</span>, Man
                Mocked by Two Women, 1819–1823
              </P>
            </P>
          </div>
          <div className="absolute bottom-0 right-0 flex flex-col justify-end">
            <p className="text-sm font-mono text-offwhite mx-5 mb-5 lg:mb-10 lg:mr-10 z-30 flex flex-wrap overflow-hidden">
              <span className="italic">(Dos mujeres y un hombre) </span>,
              <span className="px-1 font-bold">Man Mocked by Two Women,</span>
              1819–1823
            </p>
          </div>
        </ImageSection>
      </div>
    </>
  );
});
