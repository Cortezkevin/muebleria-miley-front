import { MeasurementUnit } from "../purchase";
import { InventoryMovementType } from "./warehouse";

export type CreateInventoryMovementDTO = {
  materialOrProducts: MaterialOrProductDTO[];
  type: InventoryMovementType;
  reason: string;
  grocerId: string;
  conditions: string;
  warehouse: string;
}

export type UpdateInventoryMovementDTO = {
  id: string;
  type: InventoryMovementType;
  amount: number;
  reason: string;
  productOrMaterialId: string;
  warehouse: string;
}

export type MaterialOrProductDTO = {
  id: string;
  amount: number;
  name: string;
  measurementUnit: MeasurementUnit
};
