import { useGSAP } from "@gsap/react";
import { useContext, useImperativeHandle, useRef } from "react";
import { AllowScroll, isImage } from "../App";
import { H2, H3, H4, P } from "../components/ui/typography";
import { Seperator } from "./implications";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Video } from "../components/ui/video";
import { ImageSection } from "../components/ui/ImageSection";
import React from "react";
import viejosImage from "/images/Viejos_comiendo_sopa.jpg";

gsap.registerPlugin(Flip);

export const TreatmentSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<"div">
>(({ className, ...props }, ref) => {
  const video1Ref = useRef<HTMLButtonElement | null>(null);
  const video2Ref = useRef<HTMLButtonElement | null>(null);
  const video3Ref = useRef<HTMLButtonElement | null>(null);

  const seperatorRef1 = useRef<HTMLDivElement>(null);
  const seperatorRef2 = useRef<HTMLDivElement>(null);
  const seperatorRef3 = useRef<HTMLDivElement>(null);
  const seperatorRef4 = useRef<HTMLDivElement>(null);
  const seperatorRef5 = useRef<HTMLDivElement>(null);

  const sectionRef1 = useRef<HTMLDivElement>(null);
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const sectionRef3 = useRef<HTMLDivElement>(null);

  const goyaTraumaRef = useRef<HTMLDivElement>(null);
  const mixedRef = useRef<HTMLDivElement>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const treatmentSectionRef = useRef<HTMLDivElement | null>(null);

  const { image } = useContext(isImage);

  const { scroll, setScroll } = useContext(AllowScroll);

  useImperativeHandle(ref, () => treatmentSectionRef.current as HTMLDivElement);

  const video1Props = {
    scroll: scroll,
    setScroll: setScroll,
    source:
      "https://i.ytimg.com/vi/B0xUwMcMwwc/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGF4gZShaMA8=&rs=AOn4CLBwKGuFDqP4xiX4VW1JXKHWDXnP_Q",
    alt: "CBT Video",
  };

  const video2Props = {
    scroll: scroll,
    setScroll: setScroll,
    source:
      "https://i.ytimg.com/vi/7cben51_kEg/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AHOBYAC4AOKAgwIABABGGUgWChAMA8=&rs=AOn4CLAD6eaIcV-BFdRAbMmfxajY9BXBOQ",
    alt: "Sensorimotor therapy website",
  };

  const video3Props = {
    scroll: scroll,
    setScroll: setScroll,
    source:
      "https://i.ytimg.com/vi/hKrfH43srg8/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gSygkMA8=&rs=AOn4CLA1lzsoLoZxqXLmVSby6M1RqUHUIg",
    alt: "EMDR Video",
  };

  useGSAP(
    () => {
      if (!seperatorRef1.current) return;
      gsap.from(".seperator", {
        xPercent: -100,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: seperatorRef1.current,
          start: "bottom center+=300",
        },
      });
    },
    { scope: seperatorRef1 }
  );

  useGSAP(
    () => {
      if (!seperatorRef2.current) return;
      gsap.from(".seperator", {
        xPercent: -100,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: seperatorRef2.current,
          start: "bottom center+=300",
        },
      });
    },
    { scope: seperatorRef2 }
  );
  useGSAP(
    () => {
      if (!seperatorRef3.current) return;
      gsap.from(".seperator", {
        xPercent: -100,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: seperatorRef3.current,
          start: "bottom center+=300",
        },
      });
    },
    { scope: seperatorRef3 }
  );
  useGSAP(
    () => {
      if (!seperatorRef4.current) return;
      gsap.from(".seperator", {
        xPercent: -100,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: seperatorRef4.current,
          start: "bottom center+=300",
        },
      });
    },
    { scope: seperatorRef4 }
  );
  useGSAP(
    () => {
      if (!seperatorRef5.current) return;
      gsap.from(".seperator", {
        xPercent: -100,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: seperatorRef5.current,
          start: "bottom center+=300",
        },
      });
    },
    { scope: seperatorRef5 }
  );

  useGSAP(() => {
    if (!treatmentSectionRef.current) return;
    gsap.from(".treatment-title", {
      yPercent: 200,
      ease: "power2.out",
      duration: 0.8,
      scrollTrigger: {
        trigger: treatmentSectionRef.current,
        start: "top bottom-=300",
      },
    });
  });

  const animateText = (scope: HTMLDivElement) => {
    gsap.from(".sub-title", {
      yPercent: 200,
      ease: "power2.out",
      duration: 0.8,
      stagger: 0.05,
      scrollTrigger: {
        trigger: scope,
        start: "top bottom-=100",
      },
    });
    gsap.from(".p-tag", {
      yPercent: 200,
      ease: "power2.out",
      duration: 0.8,
      stagger: 0.05,
      scrollTrigger: {
        trigger: scope,
        start: "top bottom-=100",
      },
    });
  };

  useGSAP(
    () => {
      if (!sectionRef1.current) return;
      animateText(sectionRef1.current);
    },
    { scope: sectionRef1 }
  );

  useGSAP(
    () => {
      if (!sectionRef2.current) return;
      animateText(sectionRef2.current);
    },
    { scope: sectionRef2 }
  );

  useGSAP(
    () => {
      if (!sectionRef3.current) return;
      animateText(sectionRef3.current);
    },
    { scope: sectionRef3 }
  );
  useGSAP(
    () => {
      if (!goyaTraumaRef.current) return;
      animateText(goyaTraumaRef.current);
    },
    { scope: goyaTraumaRef }
  );
  useGSAP(
    () => {
      if (!mixedRef.current) return;
      animateText(mixedRef.current);
    },
    { scope: mixedRef }
  );

  return (
    <>
      <section
        className="font-mono text-cblack"
        ref={treatmentSectionRef}
        {...props}
      >
        <section className="flex flex-col items-center min-h-[160vh] font-mono">
          <div className="overflow-hidden">
            <H2 className="treatment-title font-bold pt-[9vh] text-center mb-[10vh]">
              TREATMENT OPTIONS
            </H2>
          </div>

          <div className="flex flex-col space-y-10 w-full text-center items-center">
            <div className="overflow-hidden w-screen" ref={seperatorRef1}>
              <Seperator />
            </div>

            <div className="flex min-h-96 w-screen max-w-screen-xl">
              <div
                className="flex-1 flex flex-col items-center justify-center space-y-3"
                ref={sectionRef1}
              >
                <div className="overflow-hidden">
                  <H3 className="sub-title">
                    Cognitive Behavioral Therapy (CBT)
                  </H3>
                </div>
                <div className="overflow-hidden">
                  <P className="p-tag max-w-md text-left">
                    {" "}
                    <span className="font-bold">
                      Cognitive Behavioral Therapy (CBT)
                    </span>{" "}
                    is one of the most common way to treat trauma symptoms and
                    trauma disorders. For trauma, in CBT you work on spotting
                    and changing negative thoughts that can pop up after a
                    trauma. This helps you to become more in touch with your
                    feelings while also teaches you new ways to cope. Basically,
                    CBT helps you think and feel better by practicing new skills
                    in therapy sessions and at home with different exercises.
                    It's all about learning to tackle tough emotions and
                    situations more effectively.
                    <span className="inline-block mt-10 font-bold">
                      Check out this video on Trauma-Focused CBT →
                    </span>
                  </P>
                </div>
              </div>

              <Video {...video1Props} ref={video1Ref}>
                <div className="fixed top-0 left-0 h-screen w-screen z-50">
                  <iframe
                    className="w-screen h-screen"
                    src="https://www.youtube.com/embed/B0xUwMcMwwc?si=6yDUDNZY-JvvLI9R&autoplay=1&amp;rel=0&amp;showinfo=0&amp;modestbranding=1"
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                </div>
              </Video>
            </div>
            <div className="overflow-hidden w-screen" ref={seperatorRef2}>
              <Seperator />
            </div>

            <div className="flex min-h-96 w-screen max-w-screen-xl">
              <Video {...video2Props} ref={video2Ref}>
                <div className="fixed top-0 left-0 h-screen w-screen z-50">
                  <iframe
                    className="w-screen h-screen"
                    src="https://www.youtube.com/embed/7cben51_kEg?si=veS7USxC1s1urTn_&autoplay=1&amp;rel=0&amp;showinfo=0&amp;modestbranding=1"
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                </div>
              </Video>

              <div
                className="flex-1 flex flex-col items-center justify-center space-y-3"
                ref={sectionRef2}
              >
                <div className="overflow-hidden">
                  <H3 className="sub-title">Sensorimotor psychotherapy</H3>
                </div>
                <div className="overflow-hidden">
                  <P className="p-tag max-w-md text-left">
                    {" "}
                    <span className="font-bold">
                      Sensorimotor Psychotherapy
                    </span>{" "}
                    is a type of therapy that helps people deal with trauma by
                    focusing on their body’s reactions. When something really
                    traumatic happens, sometimes your body remembers, not just
                    our mind. In Sensorimotor Psychotherapy, the goal is to help
                    you notice how your body feels when you think about certain
                    things or remember certain events. By guiding you to pay
                    attention to these feelings a therapist teaches you ways to
                    relax and let go of the tension. It's a helpful way for
                    people who find it hard to talk about their feelings to
                    start healing, because it uses the body's own signals to
                    work through trauma.
                    <span className="inline-block mt-10 font-bold">
                      ← Want to learn more? Check out this video!
                    </span>
                  </P>
                </div>
              </div>
            </div>
            <div className="overflow-hidden w-screen" ref={seperatorRef3}>
              <Seperator />
            </div>

            <div className="flex min-h-96 w-screen max-w-screen-xl">
              <div
                className="flex-1 flex flex-col items-center justify-center space-y-3"
                ref={sectionRef3}
              >
                <div className="overflow-hidden">
                  <H3 className="sub-title">
                    Eye Movement Desensitization and Reprocessing (EMDR)
                  </H3>
                </div>
                <div className="overflow-hidden">
                  <P className="p-tag max-w-md text-left">
                    {" "}
                    <span className="font-bold">
                      EMDR (Eye Movement Desensitization and Reprocessing)
                    </span>{" "}
                    is a type of therapy motivated by the idea that moving your
                    eyes in a certain way can help your brain process and heal
                    from traumatic memories. In EMDR sessions, the therapist
                    will ask you to think about a specific traumatic memory
                    while watching their hand or a light moving back and forth.
                    Although sounding a bit unusual, this eye movement can help
                    reduce the emotional impact of the memory over time. In
                    fact, many people find it really helps them feel less upset
                    by memories that used to bother them a lot.
                    <span className="inline-block font-bold mt-10">
                      Check out this video further explaining EMDR →
                    </span>
                  </P>
                </div>
              </div>
              <Video {...video3Props} ref={video3Ref}>
                <div className="fixed top-0 left-0 h-screen w-screen z-50">
                  <iframe
                    className="w-screen h-screen"
                    src="https://www.youtube.com/embed/hKrfH43srg8?si=qNMP65IGuUYNk_38&autoplay=1&amp;rel=0&amp;showinfo=0&amp;modestbranding=1"
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                </div>
              </Video>
            </div>
            <div className="overflow-hidden w-screen" ref={seperatorRef4}>
              <Seperator />
            </div>
          </div>

          <div className="flex justify-center min-h-96 mt-[20vh]">
            <div className="text-center" ref={mixedRef}>
              <div className="overflow-hidden">
                <H4 className="sub-title">Mixed Approach</H4>
              </div>
              <div className="overflow-hidden">
                <P className="p-tag max-w-2xl">
                  Keep in mind, all these treatment therapies are not
                  one-size-fits-all! In fact, many times, treatment plans for
                  trauma include multiple different cognitive and psycho
                  therapies on top of drug therapy such as antidepressants. Your{" "}
                  <span className="font-bold">OWN</span> circumstance determines
                  treatment.
                </P>
              </div>
            </div>
          </div>
          <ImageSection
            image={image}
            scroll={scroll}
            setScroll={setScroll}
            overflowHidden={true}
            ref={imageRef}
            horizontal={true}
            src={viejosImage}
            alt="atropos o las parcas"
            className="flip-img align-middle"
            data-flip-id="img-flip"
          >
            <div className="caption-container absolute w-full h-full flex flex-col items-end justify-end z-30 overflow-hidden">
              <div className="text-sm font-mono text-offwhite mx-5 mb-5 lg:mb-10 lg:mr-10 z-20 flex flex-wrap overflow-hidden">
                <span className="italic">(Dos viejos comiendo sopa),</span>{" "}
                <span className="px-1 font-bold">
                  Two Old Ones Eating Soup,
                </span>{" "}
                1819 - 1823
              </div>
            </div>
          </ImageSection>
          <div
            className="flex justify-center min-h-96 mb-[20vh] mt-[10vh]"
            ref={goyaTraumaRef}
          >
            <div className="text-center space-y-10">
              <div className="overflow-hidden">
                <H2 className="sub-title">Goya & Trauma</H2>
              </div>
              <div className="overflow-hidden">
                <P className="p-tag max-w-2xl">
                  Through severe illness and eventual loss of hearing, Fransisco
                  Goya’s emotions shine through his later work. Signs of
                  prolonged negative mood symptoms appearing after a near death
                  experience (the mystery illness), point toward trauma!
                </P>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
});
