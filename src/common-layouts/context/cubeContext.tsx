import { CubeService } from "@/httpServices/CubeService";
import { createContext, useState } from "react";

export const CubeContext = createContext({} as any);

export const CubeContextProvider = ({ children }: any) => {
  const cubeService = new CubeService();

    const value = {
        cubeService
    };
  return (
    <>
      <CubeContext.Provider value={value}>
        {children}
      </CubeContext.Provider>
    </>
  );
};