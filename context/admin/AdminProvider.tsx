import React from "react";
import { StoreProvider } from "./";
export default function AdminProviders({ children }: { children: React.ReactElement } ){
  return (
    <StoreProvider>
      { children }
    </StoreProvider>
  );
}