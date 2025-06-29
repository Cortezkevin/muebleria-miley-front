import { MeasurementUnit } from "../purchase";
import { GrocerDTO } from "../warehouse";
import { SupplierDTO } from "./supplier";

export type PurchaseOrderStatus = "PENDIENTE" | "RECIBIDA" | "CANCELADA" | "EN_REVISION" | "COMPLETADA";
export type PurchaseOrderDetailStatus = "ACEPTADO" | "RECHAZADO" | "NO_RECEPCIONADO";

export type PurchaseOrderDTO = {
  id: string;
  date: string;
  status: PurchaseOrderStatus;
  total: string;
  requester: string;
  supplier: string;
  purchaseOrderReceptionId: string;
  supplierId: string;
  userId: string;
  guide: string;
}

export type PurchaseOrderDetailDTO = {
  id: string;
  name: string;
  amount: number;
  unitPrice: string;
  measurementUnit: MeasurementUnit;
  status?: PurchaseOrderDetailStatus;
  total: string;
}

export type DetailedPurchaseOrderDTO = {
  id: string;
  date: string;
  status: PurchaseOrderStatus;
  total: string;
  requester: string;
  supplier: SupplierDTO;
  orderDetails: PurchaseOrderDetailDTO[];
  userId: string;
  guide: string;
}

export type PurchaseOrderReceptionStatus = "PENDIENTE" | "RECIBIDO" | "EN_REVISION" | "ACEPTADO" | "RECHAZADO" | "COMPLETADO"

export type PurchaseOrderReceptionDTO = {
  id: string;
  observations: string;
  createdDate: string;
  startDate: string;
  reviewDate: string;
  completedDate: string;
  purchaseOrderStatus: PurchaseOrderStatus;
  status: PurchaseOrderReceptionStatus;
  purchaseOrderId: string;
  grocer: string;
  grocerId: string;
}

export type DetailedPurchaseOrderReceptionDTO = {
  id: string;
  observations: string;
  createdDate: string;
  startDate: string;
  reviewDate: string;
  completedDate: string;
  status: PurchaseOrderReceptionStatus;
  supplier: SupplierDTO;
  grocer: GrocerDTO;
  purchaseOrderDetails: PurchaseOrderDetailDTO[];
}

export type AcceptAndRejectPurchaseOrderDTO = {
  acceptConditions: string;
  warehouseLocation: string;
  rejectReason: string;
  rejectConditions: string;
  suggestions: string;
  acceptedOrderDetailIds: string[];
}

export type NewPurchaseDetailDTO = {
  name: string;
  materialOrProductId: string;
  amount: number;
  unitPrice: string;
  measurementUnit: MeasurementUnit;
  total: string;
}

export type CreatePurchaseOrderDTO = {
  userId: string;
  supplierId: string;
  details: NewPurchaseDetailDTO[];
}