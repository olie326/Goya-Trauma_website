import { H4, A, H1A } from "../components/ui/typography";
import goyaImage from "/images/goyas-black-paintings-1.jpg";

export default function Footer() {
  // const goyaRef = useRef<>(null);

  return (
    <section className="sticky bottom-0 left-0 grid grid-cols-5 grid-rows-5 bg-cblack h-screen w-full">
      <div className=" col-span-5 row-span-2 overflow-hidden">
        <img src={goyaImage} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex col-span-5">
        <A
          color="offwhite"
          className="py-3 px-5 text-offwhite"
          href="https://en.wikipedia.org/wiki/Black_Paintings"
        >
          Learn more about Goya's Black Paintings →
        </A>
      </div>
      <div className="col-start-0 col-span-3 row-start-4 row-span-2 flex items-center justify-normal">
        <H1A
          href="https://www.linkedin.com/in/oliver-lee-954a00170/"
          color="offwhite"
          className=" text-offwhite text-left font-mono font-bold tracking-tight text-[11vw] pl-[3vw] pb-2"
        >
          Oliver Lee.
        </H1A>
      </div>

      <div className="text-offwhite col-span-2 row-span-2 col-start-4 row-start-4 justify-self-center place-content-center">
        <H4>ADDITIONAL RESOURCES</H4>
        <ul className="space-y-1 list-disc list-outside pl-8">
          <li>
            <A color="offwhite" href="https://www.apa.org/topics/trauma">
              Trauma - American Psychological Association
            </A>
          </li>
          <li>
            <A color="offwhite" href="https://www.ptsd.va.gov/">
              National Center for PTSD
            </A>
          </li>
          <li>
            <A
              color="offwhite"
              href="https://www.museodelprado.es/en/the-collection/artist/goya-y-lucientes-francisco-de/39568a17-81b5-4d6f-84fa-12db60780812"
            >
              Fransisco Goya - Museo Del Prado
            </A>
          </li>
        </ul>
      </div>
    </section>
  );
}
