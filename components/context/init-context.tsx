'use client';
import { useEffect, useState, createContext, useContext } from "react"

type InitContextType = {
  initialize: boolean;
  setInitialize: (route: boolean) => void;
}

export const InitContext = createContext<InitContextType>({initialize: false, setInitialize: () => {}});
export const useInitContext = () => useContext(InitContext);

export const InitProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
  const [initialize, setInitialize] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log('Init changed to:', initialize);
  // }, [initialize]);

  return (
    <InitContext.Provider value={{initialize, setInitialize}}>
      {children}
    </InitContext.Provider>
  )
}
