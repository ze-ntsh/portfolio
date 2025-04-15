"use client";
import React, { useEffect, useState, createContext, useContext, useLayoutEffect } from "react";

type NavContextType = {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  setRouteWithScroll: (route: string) => void;
  cliVisible: boolean;
  setCLIvisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavContext = createContext<NavContextType>({
  route: "home",
  setRoute: () => {},
  setRouteWithScroll: () => {},
  cliVisible: true,
  setCLIvisible: () => {},
});
export const useNavContext = () => useContext(NavContext);

export const NavProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [route, setRoute] = useState("home");
  const [cliVisible, setCLIvisible] = useState(true);

  const setRouteWithScroll = (route: string) => {
    setRoute(route);
    const dataAttr = `[data-route="${route}"]`;
    const element = document.querySelector(dataAttr);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NavContext.Provider
      value={{
        route,
        setRoute,
        setRouteWithScroll,
        cliVisible,
        setCLIvisible,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
