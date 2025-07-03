import React from "react";
import { EmployeeProvider, OrderProvider, StoreProvider, WarehouseProvider } from "./";
import { PurchaseProvider } from "./purchase";
export default function AdminProviders({ children }: { children: React.ReactElement } ){
  return (
    <StoreProvider>
      <EmployeeProvider>
        <WarehouseProvider>
          <PurchaseProvider>
            <OrderProvider>
              { children }
            </OrderProvider>
          </PurchaseProvider>
        </WarehouseProvider>
      </EmployeeProvider>
    </StoreProvider>
  );
}