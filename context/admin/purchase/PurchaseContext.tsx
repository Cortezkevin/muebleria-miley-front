"use client";

import { CreatePurchaseOrderDTO, CreateRawMaterialDTO, CreateSupplierDTO, PurchaseOrderDTO, PurchaseOrderReceptionDTO, RawMaterialDTO, SupplierDTO, UpdateRawMaterialDTO } from "@/types";
import { createContext } from "react";

export interface PurchaseProps {
  supplier: {
    suppliers: SupplierDTO[];
    loading: boolean;
    selected: SupplierDTO | null;
  };
  rawMaterial: {
    rawMaterials: RawMaterialDTO[];
    loading: boolean;
    selected: RawMaterialDTO | null;
  };
  purchaseOrder: {
    purchaseOrders: PurchaseOrderDTO[];
    loading: boolean;
    selected: PurchaseOrderDTO | null;
  };
  loadingData: boolean;

  loadSuppliers: () => void;
  loadRawMaterials: () => void;
  loadPurchaseOrders: () => void;

  onSelectSupplier: (supplier: SupplierDTO | null) => void;
  onSelectRawMaterial: (supplier: RawMaterialDTO | null) => void;
  onSelectPurchaseOrder: (purchaseOrder: PurchaseOrderDTO | null) => void;

  onCreateOrEditSupplier: (
    type: "Edit" | "Create",
    id: string | null,
    supplier: CreateSupplierDTO | SupplierDTO,
    onTerminate: () => void
  ) => void;

  onCreateOrEditRawMaterial: (
    type: "Edit" | "Create",
    id: string | null,
    rawMaterial: CreateRawMaterialDTO | UpdateRawMaterialDTO,
    onTerminate: () => void
  ) => void;

  onCreatePurchaseOrder: (purchaseOrder: CreatePurchaseOrderDTO, onTerminate: () => void) => void;
}
export const PurchaseContext = createContext({} as PurchaseProps);
