import React from "react";
import { StoreProvider } from "./";
import { PurchaseProvider } from "./purchase";
export default function AdminProviders({ children }: { children: React.ReactElement } ){
  return (
    <StoreProvider>
      <PurchaseProvider>
        { children }
      </PurchaseProvider>
    </StoreProvider>
  );
}