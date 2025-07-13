"use client";

import { CarrierDTO, GrocerDTO, NewCarrierDTO, NewGrocerDTO } from "@/types";
import { createContext } from "react";

export interface EmployeeProps {
  grocer: {
    grocers: GrocerDTO[];
    loading: boolean;
    selected: GrocerDTO | null;
  };
  carrier: {
    carriers: CarrierDTO[];
    loading: boolean;
    selected: CarrierDTO | null;
  };

  loadingData: boolean;

  loadCarriers: () => void;
  loadGrocers: () => void;

  onSelectCarrier: (carrier: CarrierDTO | null) => void;
  onSelectGrocer: (grocer: GrocerDTO | null) => void;

  onCreateGrocer: (grocer: NewGrocerDTO, onTerminate: () => void) => void;
  onCreateCarrier: (carrier: NewCarrierDTO, onTerminate: () => void) => void;
}
export const EmployeeContext = createContext({} as EmployeeProps);
