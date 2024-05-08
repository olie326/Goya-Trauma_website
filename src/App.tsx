import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import "./index.css";
import { NavBar } from "./components/ui/navbar";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Landing, LandingRef } from "./sections/landing";
import { TraumaDefinitionSection } from "./sections/traumaDefinition";
import { ImplicationSection } from "./sections/implications";
import { TreatmentSection } from "./sections/treatments";
import Footer from "./sections/footer";
import useToggleScroll from "./util/useToggleScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

// SUICIDE CLAIMS ONE PERSON EVERY 10.9 minutes

interface scrollStateProps {
  scroll: boolean;
  setScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Timeline = createContext(gsap.timeline({ paused: true }));
export const AllowScroll = createContext<scrollStateProps>({
  scroll: false,
  setScroll: () => {},
});
export const ImageVisible = createContext<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  visible: false,
  setVisible: () => {},
});

export const isImage = createContext<{
  image: boolean;
  setImage: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  image: false,
  setImage: () => {},
});

function App() {
  const lenisRef = useRef<any>(null);

  useGSAP(() => {
    if (lenisRef.current.lenis) {
      lenisRef.current.lenis.lerp = 1;
    }
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });
  const landingRef = useRef<LandingRef>(null);

  const implicationSectionRef = useRef<HTMLDivElement | null>(null);
  const traumaDefinitionSectionRef = useRef<HTMLDivElement | null>(null);
  const treatmentSectionRef = useRef<HTMLDivElement | null>(null);

  const section1ScrollTo = () =>
    lenisRef.current.lenis.scrollTo(traumaDefinitionSectionRef.current);
  const section2ScrollTo = () =>
    lenisRef.current.lenis.scrollTo(implicationSectionRef.current);
  const section3ScrollTo = () =>
    lenisRef.current.lenis.scrollTo(treatmentSectionRef.current);

  const nav = useRef<HTMLUListElement | null>(null);
  useGSAP(
    () => {
      if (nav.current) {
        gsap.from(nav.current.children, {
          y: -100,
          yPercent: -100,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
        });
      }
    },
    { scope: nav }
  );

  const [image, setImage] = useState(false);
  const masterTl = useContext(Timeline);
  const [scroll, setScroll] = useState(true);
  useToggleScroll(!scroll);

  useEffect(() => {}, [scroll]);
  useGSAP(() => {
    if (!lenisRef.current) return;
    if (scroll) {
      lenisRef.current.lenis?.start();
    } else {
      lenisRef.current.lenis?.stop();
    }
  }, [scroll]);

  const { visible, setVisible } = useContext(ImageVisible);

  return (
    <AllowScroll.Provider value={{ scroll: scroll, setScroll: setScroll }}>
      <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.1 }}>
        <Timeline.Provider value={masterTl}>
          <isImage.Provider value={{ image: image, setImage: setImage }}>
            <ImageVisible.Provider
              value={{ visible: visible, setVisible: setVisible }}
            >
              {/* <Loader /> */}
              <div className="relative z-30">
                <div className="bg-offwhite">
                  <NavBar
                    handleSectionScroll1={section1ScrollTo}
                    handleSectionScroll2={section2ScrollTo}
                    handleSectionScroll3={section3ScrollTo}
                    ref={nav}
                    className="px-5 text-mono"
                  />
                  <Landing ref={landingRef} />
                  <TraumaDefinitionSection ref={traumaDefinitionSectionRef} />
                  <ImplicationSection ref={implicationSectionRef} />
                  <TreatmentSection ref={treatmentSectionRef} />
                </div>
              </div>
              <Footer />
            </ImageVisible.Provider>
          </isImage.Provider>
        </Timeline.Provider>
      </ReactLenis>
    </AllowScroll.Provider>
  );
}

export default App;
