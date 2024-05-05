import { useEffect } from "react";

const useToggleScroll = (isScrollDisabled: boolean) => {
  useEffect(() => {
    document.body.style.overflow = isScrollDisabled ? "hidden" : "auto";
    // Clean up function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isScrollDisabled]);
};

export default useToggleScroll;
