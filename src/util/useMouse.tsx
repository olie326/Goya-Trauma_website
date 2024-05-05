import { useEffect, useState } from "react";

export default function useMouse() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return position;
}
