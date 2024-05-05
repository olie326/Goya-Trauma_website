import { useGSAP } from "@gsap/react";
import { useContext, useImperativeHandle, useRef } from "react";
import { AllowScroll, isImage } from "../App";
import gsap from "gsap/gsap-core";
import { H2, H3, H4, P } from "../components/ui/typography";
import React from "react";
import clsx from "clsx";
import { SymptomCard, SymptomContent } from "../components/ui/card";
import { Video } from "../components/ui/video";
import { AccordionRoot } from "../components/ui/accordion";
import { ImageSection } from "../components/ui/ImageSection";
import alteImage from "/images/alte_Manner.jpg";

gsap.registerPlugin(useGSAP);

export const ImplicationSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<"div">
>(({ className, ...props }, ref) => {
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const implicationContainerRef = useRef<HTMLDivElement | null>(null);
  const seperatorRef = useRef<HTMLDivElement>(null);

  const imgRef2 = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { image } = useContext(isImage);

  useImperativeHandle(
    ref,
    () => implicationContainerRef.current as HTMLDivElement
  );

  const { scroll, setScroll } = useContext(AllowScroll);

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
    if (!implicationContainerRef.current) return;
    gsap.from(".trauma-effects", {
      yPercent: 200,
      ease: "power2.out",
      duration: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: implicationContainerRef.current,
        start: "top center-=100",
      },
    });
  });

  useGSAP(
    () => {
      if (!implicationContainerRef.current) return;

      gsap.from(".sub-title", {
        yPercent: -200,
        ease: "power2.out",
        duration: 1.3,
        scrollTrigger: {
          trigger: implicationContainerRef.current,
          start: "top center-=100",
        },
      });

      gsap.from(".p-tag", {
        yPercent: 200,
        ease: "power2.out",
        duration: 1,
        delay: 0.05,
        scrollTrigger: {
          trigger: implicationContainerRef.current,
          start: "top center-=100",
        },
      });
    },
    { scope: section1Ref }
  );

  return (
    <>
      <div
        className={clsx(className, "relative overflow-hidden")}
        ref={implicationContainerRef}
        {...props}
      >
        <section className="relative overflow-hidden min-h-[160vh] border-t-[0.05rem] border-coffee">
          <div className="overflow-hidden">
            <H2 className="trauma-effects text-cblack pt-[9vh] mb-[10vh] text-center">
              UNDERSTANDING THE <br />
              EFFECTS OF TRAUMA
            </H2>
          </div>

          <div className="flex justify-center mb-[20vh]" ref={section1Ref}>
            <div className="flex flex-col gap-3 overflow-hidden">
              <H4 className="sub-title text-cblack flex-1">
                Why is Trauma Important?
              </H4>
              <div className="flex gap-3">
                <P className="p-tag flex-1 max-w-md">
                  Trauma is important because of it’s impact on peoples’ overall
                  health (yes even physical health!). For some people, talking
                  about their trauma is especially difficult. No one wants to
                  ever recall and relive unbearable memories. On the other hand,
                  for others, it is important to process these memories for the
                  sake of positive longterm mental health. In other words, only
                  by delving deep into traumatic memories, can people confront
                  the hold that trauma has on their well being. Then, by
                  accepting and processing the trauma, do people find newfound
                  awareness which in turn help them better cope and understand
                  their emotions.
                </P>
                <P className="p-tag flex-1 max-w-md">
                  The National Institute of Mental Health (NIH) reports that
                  about 1 in 5 adults in the U.S. live with a mental illness.
                  However, a trend of a reluctance to seek out help for mental
                  health persists. Perhaps due to a fear of being ridiculed or
                  being seen as ‘soft’ by others, people avoid treatment.
                  Therefore, by educating people on what trauma is and how it
                  can effect their life, may they hopefully be more willing to
                  seek help!
                </P>
              </div>
            </div>
          </div>
          <div className="overflow-hidden" ref={seperatorRef}>
            <Seperator />
          </div>

          <div className="flex mt-[10vh] mb-[20vh]">
            <div className="space-y-5 w-full">
              <div className="text-center mb-10">
                <H3>What can Trauma Look Like?</H3>
                <P>4 different categories of symptoms may arise.</P>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-rows-2 grid-cols-1 w-full text-center justify-items-center max-w-screen-2xl">
                  <div className="flex row-span-1 row-start-1 col-start-1 h-full w-full">
                    <SymptomCard
                      title="Intrusion"
                      className="border-t border-b-[0.5px] border-r-[0.5px] border-cblack"
                    >
                      <SymptomContent>
                        Intrusion symptoms are characterized by either memories,
                        dreams, or dissociations that intrude and distrupt how
                        someone functions. A particular intrusion symptom are
                        flashbacks, specifically, flashbacks back to the
                        traumatic event(s).
                      </SymptomContent>
                    </SymptomCard>

                    <SymptomCard
                      title="Avoidance"
                      className="border-t border-b-[0.5px] border-l-[0.5px] border-cblack"
                    >
                      <SymptomContent>
                        Avoidance symptoms are recognized when people actively
                        avoid interacting/remembering anything remotely related
                        to their traumatic event(s). For instance, if someone
                        had a traumatic event happen in a subway station, they
                        may avoid going on public transportation all together.
                      </SymptomContent>
                    </SymptomCard>
                  </div>
                  <div className="flex row-span-1 row-start-2 col-start-1 h-full w-full">
                    <SymptomCard
                      title="Negative Mood"
                      className="border-b border-t-[0.5px] border-r-[0.5px] border-cblack"
                    >
                      <SymptomContent>
                        Negative mood symptoms are distinctive when an
                        overwhelming majority of someone’s emotions are negative
                        specifically due to their trauma. Imagine if a person
                        experienced a traumatic physical assault years ago.
                        Negative mood symptoms might look like as if this person
                        still has a persistent hopelessness and pessimistic
                        attitude even after recovering physically. Other
                        distinctive negative mood symptoms also exist like fuzzy
                        memory and exaggerated negative beliefs among others.
                      </SymptomContent>
                    </SymptomCard>
                    <SymptomCard
                      title="Arousal"
                      className="border-b border-t-[0.5px] border-l-[0.5px] border-cblack"
                    >
                      <SymptomContent>
                        Arousal symptoms are recognized when a person becomes
                        very irritable or even hypervigilant among other
                        criteria. Imagine a person who was recently mugged. An
                        arousal symptom might look like if the person wasn’t
                        able to walk down the street without constantly checking
                        their surroundings, even being startled at the smallest
                        sound.
                      </SymptomContent>
                    </SymptomCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-[20vh]">
            <H3 className="text-cblack px-3">TRAUMA RELATED DISORDERS</H3>

            <AccordionRoot
              title="Acute Stress Disorder"
              className="text-cbrown border-t-[0.05rem] border-b-[0.025rem] border-cbrown"
            >
              <div className="flex gap-5">
                <Video
                  scroll={scroll}
                  source={
                    "  https://i.ytimg.com/vi/lw2x1dzt7bE/maxresdefault.jpg"
                  }
                  setScroll={setScroll}
                  alt={""}
                >
                  {" "}
                  <div className="fixed top-0 left-0 h-screen w-screen z-50">
                    <iframe
                      className="w-screen h-screen"
                      src="https://www.youtube.com/embed/lw2x1dzt7bE?si=qhvWOPY_j76nP-KW&autoplay=1&amp;rel=0&amp;showinfo=0&amp;modestbranding=1"
                      title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                      allowFullScreen={false}
                      loading="lazy"
                    ></iframe>
                  </div>
                </Video>
                <P className="flex-1">
                  <span className="font-bold">Acute Stress Disorder</span> is a
                  traumatic stress disorder where in addition to experiencing a
                  traumatic event, the disturbance, or the way in which peoples’
                  actions or emotions are different from their normal state, is
                  caused by the trauma has only lasted 3 days - 1 month. <br />
                  Furthermore, experiencing a plethora of the four categories of
                  symptoms, although not specified which ones, is required to be
                  diagnosed.
                  <br />
                  <span className="inline-block font-bold mt-10">
                    ← Check out this awesome video on Acute Stress Disorder!
                  </span>
                </P>
              </div>
            </AccordionRoot>

            <AccordionRoot
              title="PTSD - Post Traumatic Stress Disorder"
              className="text-cbrown border-b-[0.05rem] border-cbrown"
            >
              <div className="flex gap-5">
                <Video
                  scroll={scroll}
                  source={"//i.ytimg.com/vi/b_n9qegR7C4/maxresdefault.jpg"}
                  setScroll={setScroll}
                  alt={""}
                >
                  {" "}
                  <div className="fixed top-0 left-0 h-screen w-screen z-50">
                    <iframe
                      className="w-screen h-screen"
                      src="https://www.youtube.com/embed/b_n9qegR7C4?si=AkV730s4reu1R_w0&autoplay=1&amp;rel=0&amp;showinfo=0&amp;modestbranding=1"
                      title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                      allowFullScreen={false}
                      loading="lazy"
                    ></iframe>
                  </div>
                </Video>
                <P className="flex-1">
                  <span className="font-bold">
                    Post-Traumatic Stress Disorder (PTSD)
                  </span>{" "}
                  is a mental health condition that can happen after someone
                  goes through a really scary or dangerous event. Unlike Acute
                  Stress Disorder, which lasts from a few days to a month, PTSD
                  sticks around for much longer. People with PTSD often have
                  intense, upsetting thoughts and feelings related to their
                  experience that last long after the event has ended. They
                  might relive the event through flashbacks or nightmares, feel
                  sad, frightened or angry, or even feel detached or estranged
                  from other people.
                  <br />
                  <span className="inline-block mt-2">
                    To be diagnosed with PTSD, you need to have symptoms from
                    all four symptom categories! These symptoms also have to be
                    serious enough to make school, work, or simply living really
                    difficult.
                  </span>
                  <br />
                  <span className="inline-block font-bold mt-10">
                    {" "}
                    ← Want to learn more about PTSD? Check out this video!
                  </span>
                </P>
              </div>
            </AccordionRoot>
          </div>
        </section>
      </div>
      <div ref={containerRef}>
        <ImageSection
          image={image}
          scroll={scroll}
          setScroll={setScroll}
          overflowHidden={true}
          ref={imgRef2}
          horizontal={false}
          src={alteImage}
          alt="atropos o las parcas"
          className="flip-img align-middle"
          data-flip-id="img-flip"
        >
          <div className="absolute bottom-0 right-0 flex flex-col justify-end">
            <p className="text-sm font-mono text-offwhite mx-5 mb-5 lg:mb-10 lg:mr-10 z-40 flex flex-wrap overflow-hidden">
              <span className="italic">
                (Dos viejos/Un viejo y un fraile),{" "}
              </span>
              ,<span className="font-bold">Two Old Men, </span>, 1819–1823
            </p>
          </div>
        </ImageSection>
      </div>
    </>
  );
});

const Seperator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("seperator w-full h-[.025rem] bg-coffee", className)}
    {...props}
  ></div>
));

export { Seperator };
