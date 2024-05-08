import { useEffect, useRef, useState } from "react";

export default function useMouse(
  ref: React.MutableRefObject<HTMLElement | null>
) {
  const [position, setPosition] = useState({
    x: 1000 / 2,
    y: 1000 / 2,
    inside: false,
  }); //state is for updating position for animations + if inside
  const mousePositionRef = useRef({ x: 0, y: 0 }); // also using a ref in order to update live mouse position for scroll

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      mousePositionRef.current = { x: e.clientX, y: e.clientY };

      setPosition({
        x: e.clientX,
        y: e.clientY,
        inside: inside,
      });
    };

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const livePosition = mousePositionRef.current;
      const inside =
        livePosition.x >= rect.left &&
        livePosition.x <= rect.right &&
        livePosition.y >= rect.top &&
        livePosition.y <= rect.bottom;
      setPosition((prev) => ({
        ...prev,
        inside: inside,
      }));
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return position;
}
