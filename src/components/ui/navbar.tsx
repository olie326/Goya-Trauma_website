import { FaceIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { clsx } from "clsx";
import React from "react";
import { A } from "./typography";

interface NavBarProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenu.Root> {
  handleSectionScroll1: () => void;
  handleSectionScroll2: () => void;
  handleSectionScroll3: () => void;
}

export const NavBar = React.forwardRef<
  React.ElementRef<typeof NavigationMenu.List>,
  NavBarProps
>(
  (
    {
      handleSectionScroll1,
      handleSectionScroll2,
      handleSectionScroll3,
      className,
      ...props
    },
    ref
  ) => (
    <NavigationMenu.Root
      {...props}
      className="fixed box-border w-screen top-0 left-0 z-40"
    >
      <NavigationMenu.List
        className={clsx(
          "flex flex-row justify-between px-6 py-3 font-mono font-normal text-md text-coffee border-b-[.05rem] border-coffee bg-offwhite",
          className
        )}
        ref={ref}
      >
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center justify-center">
            <div className="inline-flex gap-3">
              <A color="coffee" onClick={handleSectionScroll1}>
                1
              </A>
              <A color="coffee" onClick={handleSectionScroll2}>
                2
              </A>
              <A color="coffee" onClick={handleSectionScroll3}>
                3
              </A>
            </div>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center justify-center mix-blend-difference">
            New York
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center justify-center">
            <A color="coffee" href="">
              <FaceIcon className="mr-2 mb-[2px] inline-flex items-center justify-center" />
              Oliver Lee
            </A>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator className="NavigationMenuIndicator" />
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
);
