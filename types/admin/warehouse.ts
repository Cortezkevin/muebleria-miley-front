import { ProductDTO } from "../catalog";
import { MeasurementUnit, RawMaterialDTO } from "../purchase";
import { GrocerDTO } from "../warehouse";

export type WarehouseDTO = {
  id: string;
  location: string;
}

export type InventoryMovementType = "ENTRADA" | "SALIDA" | "PRODUCCION";

export type MovementsDTO = {
  id: string;
  type: InventoryMovementType;
  grocer: string;
  initialStock: number;
  amount: number;
  newStock: number;
  date: string;
  reason: string;
  productOrMaterial: string;
  warehouse: string;
}

export type DetailedMovementsDTO = {
  id: string;
  type: InventoryMovementType;
  grocer: GrocerDTO;
  initialStock: number;
  amount: number;
  newStock: number;
  date: string;
  reason: string;
  rawMaterial?: RawMaterialDTO;
  productDTO?: ProductDTO;
  warehouse: string;
  guide: string;
}

export type IMinimalMovements = {
  id: string;
  unitType: MeasurementUnit;
  amount: number;
  date: string;
  productOrMaterial: string;
}