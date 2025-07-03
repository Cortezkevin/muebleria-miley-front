"use client";

import { CreateInventoryMovementDTO, UpdateInventoryMovementDTO, WarehouseDTO, MovementsDTO } from "@/types";
import { createContext } from "react";

export interface WarehouseProps {
  warehouse: {
    warehouses: WarehouseDTO[];
    loading: boolean;
    selected: WarehouseDTO | null;
  };
  movement: {
    movements: MovementsDTO[];
    loading: boolean;
    selected: MovementsDTO | null;
  };
  /* entryGuide: {
    entryGuides: IEntryGuide[];
  };
  exitGuide: {
    exitGuides: IEntryGuide[];
  };
  rejectionGuide: {
    rejectionGuides: IRejectionGuide[];
  }; */
  loadingData: boolean;

  loadWarehouses: () => void;
  loadMovements: () => void;
  /* loadEntryGuides: () => void;
  loadExitGuides: () => void;
  loadRejectionGuides: () => void; */

  onSelectWarehouse: (warehouse: WarehouseDTO | null) => void;
  onSelectMovement: (movement: MovementsDTO | null) => void;

  onCreateOrEditMovement: (
    type: "Edit" | "Create",
    id: string | null,
    movement: CreateInventoryMovementDTO | UpdateInventoryMovementDTO,
    onTerminate: () => void
  ) => void;

  onCreateOrEditWarehouse: (
    type: "Edit" | "Create",
    id: string | null,
    warehouse: string | WarehouseDTO,
    onTerminate: () => void
  ) => void;

}
export const WarehouseContext = createContext({} as WarehouseProps);
