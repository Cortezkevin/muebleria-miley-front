import React from "react";
import { EmployeeProvider, OrderProvider, StoreProvider, WarehouseProvider } from "./";
import { PurchaseProvider } from "./purchase";
import { NotificationProvider } from "./notifications";

export default function AdminProviders({ children }: { children: React.ReactElement } ){
  return (
    <NotificationProvider>
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
    </NotificationProvider>
  );
}