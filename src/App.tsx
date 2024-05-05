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
    console.log(lenisRef.current);
    if (lenisRef.current.lenis) {
      lenisRef.current.lenis.lerp = 1;
      console.log(lenisRef.current);
    }
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
      // console.log("updatedddd");
    }

    gsap.ticker.add(update);
    console.log("updated");

    return () => {
      gsap.ticker.remove(update);
      console.log("removed");
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

  useEffect(() => {
    console.log("scroll: ", scroll);
  }, [scroll]);
  useGSAP(() => {
    if (!lenisRef.current) return;
    if (scroll) {
      lenisRef.current.lenis?.start();
      console.log("scroll started");
    } else {
      lenisRef.current.lenis?.stop();
      console.log("scroll stopped");
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

// ------------ LEGACY FOR TEXT SLIDESHOW ------------- //

// const [height, setHeight] = useState(0);

// useEffect(() => {
//   if (pplRef.current) {
//     const updateHeight = () => {
//       if (pplRef.current) {
//         if (pplRef.current.offsetHeight > 0) {
//           const newHeight = pplRef.current.offsetHeight;
//           setHeight(newHeight);
//         } else {
//           const newHeight = getHeight(pplRef.current);
//           console.log(newHeight);
//           setHeight(newHeight);
//           console.log("rerender");
//         }
//       }
//     };

//     const observer = new ResizeObserver((entries) => {
//       console.log("observer triggered");
//       for (let entry of entries) {
//         if (entry.target === pplRef.current) {
//           updateHeight();
//         }
//       }
//     });

//     observer.observe(pplRef.current);

//     return () => {
//       console.log("Observer disconnected");
//       observer.disconnect();
//     };
//   }
// }, []);

// useEffect(() => {
//   document
//     .querySelectorAll<HTMLElement>(".text-slideshow")
//     .forEach((element) => {
//       element.style.height = `${height}px`;
//     });
// }, [height]);

// useGSAP(
//   () => {
//     if (textRef.current && pplRef.current) {
//       // Assuming the elements have equal height or calculating total height

//       const textSlideshowElements =
//         document.querySelectorAll<HTMLElement>(".text-slideshow");

//       if (textSlideshowElements.length > 0) {
//         const lines = Array.from(textSlideshowElements);
//         const rows = lines.length;

//         console.log(height);

//         if (rows > 0) {
//           const firstRow = Array.from(lines[0].childNodes);
//           const columns = firstRow.length;

//           for (let col = 0; col < columns; col++) {
//             const last = col === columns - 1;
//             const yOffset = last
//               ? -1 * height * col
//               : -1 * height * (col + 1) - height * 0.3;

//             if (col === 0 || last) {
//               for (let row = 0; row < rows; row++) {
//                 const curr = Array.from(lines[row].childNodes);

//                 tl.current.to(
//                   curr[col],
//                   {
//                     duration: 2,
//                     y: yOffset,
//                     ease: "power3.out",
//                   },
//                   "<"
//                 );
//               }
//             } else {
//               //entry animation
//               for (let row = 0; row < rows; row++) {
//                 const curr = Array.from(lines[row].childNodes);

//                 tl.current.to(
//                   curr[col],
//                   {
//                     duration: 2,
//                     y: -1 * height * col,
//                     ease: "power3.out",
//                   },
//                   "<"
//                 );
//               }
//               //exit animation per column
//               for (let row = 0; row < rows; row++) {
//                 const curr = Array.from(lines[row].childNodes);

//                 tl.current.to(
//                   curr[col],
//                   {
//                     duration: 2,
//                     delay: row === 0 ? 4 : undefined,
//                     y: -1 * height * (col + 1) - height * 0.3,
//                     ease: "power3.out",
//                   },
//                   "<"
//                 );
//               }
//             }
//           }
//         }
//       }
//       tl.current.play();
//     }
//   },
//   { revertOnUpdate: true, dependencies: [height] }
// );

export default App;
