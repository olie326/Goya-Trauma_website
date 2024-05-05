import { useEffect, useState } from "react";
import { H1 } from "../components/ui/typography";
import React from "react";

export default function Loader() {
  useEffect(() => {});

  return (
    <div className="fixed z-50">
      <div className="absolute top-0 left-0 h-[40vh] w-screen bg-cstone z-40"></div>
      <div className="loading-bar absolute top-0 left-0 h-screen w-screen bg-cblack z-20">
        <PercentageDisplay />
      </div>
    </div>
  );
}

const PercentageDisplay = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithRef<"h1">
>(({ ...props }, ref) => {
  const [percentage] = useState(0);

  return (
    <H1 {...props} ref={ref}>
      {percentage}%
    </H1>
  );
});
