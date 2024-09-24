'use client';
import React, { useEffect, useState, createContext, useContext } from "react"

type NavContextType = {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  cliVisible: boolean;
  setCLIvisible: React.Dispatch<React.SetStateAction<boolean>>;
  // navActive: boolean;
  // setNavActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavContext = createContext<NavContextType>({
  route: 'main', 
  setRoute: () => {},
  // navActive: false,
  // setNavActive: () => {},
  cliVisible: true,
  setCLIvisible: () => {},
});
export const useNavContext = () => useContext(NavContext);

export const NavProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
  const [route, setRoute] = useState('main');
  const [cliVisible, setCLIvisible] = useState(false  );
  // const [navActive, setNavActive] = useState(false);

  // useEffect(() => {
  //   console.log('Route changed to:', route);
  // }, [route]);

  // useEffect(() => {
  //   console.log('CLI visibility changed to:', cliVisible);
  // }, [cliVisible]);

  return (
    <NavContext.Provider value={{
      route, 
      setRoute, 
      cliVisible,
      setCLIvisible, 
    // navActive, 
    // setNavActive
    }}>
      {children}
    </NavContext.Provider>
  )
}
