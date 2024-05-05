import React, { useLayoutEffect, useRef, useMemo } from "react";

const useTotalChildrenHeight = (children: React.ReactNode) => {
  // Ref to store the total height
  const totalHeightRef = useRef(0);

  // Convert children to an array and memoize
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  useLayoutEffect(() => {
    if (!children) return;
    // Variable to accumulate heights
    let totalHeight = 0;

    // Map over children to accumulate their heights
    childrenArray.forEach((child) => {
      if (React.isValidElement(child)) {
        const node = document.querySelector(`[data-key="${child.key}"]`);
        if (node instanceof HTMLElement) {
          totalHeight += node.offsetHeight; // Add up the offsetHeight of each child
        }
      }
      // Assuming each child has a unique key that can be used as a selector
    });

    // Store the accumulated height in the ref
    totalHeightRef.current = totalHeight;
  }, [childrenArray]); // Depend on the memoized children array

  return totalHeightRef;
};

export { useTotalChildrenHeight };
