export type MeasurementUnit = "PESO" | "VOLUMEN" | "CANTIDAD" | "LONGITUD";

export type RawMaterialDTO = {
  id: string;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  stock: number;
  unitPrice: string;
  supplier: string;
  supplierId: string;
}

export type CreateRawMaterialDTO = {
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  unitPrice: string;
  supplierId: string;
}

export type UpdateRawMaterialDTO = {
  id: string;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  unitPrice: string;
  supplierId: string;
}