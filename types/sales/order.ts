import { CarrierDTO } from "../delivery/carrier";
import { GrocerDTO } from "../warehouse/grocer";

export type PaymentMethod = "TARJETA" | "YAPE";
export type ShippingStatus = "PENDIENTE" | "EN_PREPARACION" | "PREPARADO" | "EN_TRANSITO" | "ENTREGADO";
export type PreparationStatus = "PENDIENTE" | "EN_PREPARACION" | "EN_EMPAQUETADO" | "LISTO_PARA_RECOGER";
export type OrderStatus = "PENDING" | "IN_PROGRESS" | "PREPARADO" | "SENT" | "ENTREGADO" | "ANULADO";

export type OrderDTO = {
  id: string,
  total: string,
  user: string,
  shippingAddress: string,
  createdDate: string,
  cancelledDate: string,
  completedDate: string,
  paymentMethod: PaymentMethod,
  shippingStatus: ShippingStatus,
  preparationStatus: PreparationStatus,
  status: OrderStatus
}

export type OrderDetailDTO = {
  id: string,
  image: string,
  name: string,
  price: string,
  amount: number,
  total: string
}

export type UserOrderDTO = {
  fullName: string;
  email: string;
  phone: string;
}

export type DetailedOrderDTO = {
  id: string;
  note: string;
  subtotal: string;
  discount: string;
  shippingCost: string;
  tax: string;
  total: string;
  user: UserOrderDTO;
  shippingAddress: string;
  specificAddress: string;
  createdDate: string;
  cancelledDate: string;
  completedDate: string;
  paymentMethod: PaymentMethod;
  preparation: PreparationOrderDTO,
  shipping: ShippingOrderDTO,
  status: OrderStatus;
  orderDetails: OrderDetailDTO[];
  invoiceUrl: string;
}

export type ShippingOrderDTO = {
  id: string;
  userIdFromCarrier: string;
  orderId: string;
  carrier: CarrierDTO;
  preparedBy: string;
  address: string;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  shippingDate: string;
  completedDate: string;
  status: ShippingStatus;
}

export type PreparationOrderDTO = {
  id: string;
  userIdFromGrocer: string;
  grocer: GrocerDTO;
  orderId: string;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  completedDate: string;
  orderStatus: OrderStatus;
  status: PreparationStatus;
}

export type DetailedPreparationOrderDTO = {
  id: string;
  order: DetailedOrderDTO;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  completedDate: string;
  status: PreparationStatus;
}

export type DetailedShippingOrderDTO = {
  id: string;
  order: DetailedOrderDTO;
  preparedBy: string;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  shippingDate: string;
  completedDate: string;
  exitGuideId: string;
  status: ShippingStatus;
}

export type CompletedOrderPreparationDTO = {
  orderPreparationId: string;
  observations: string;
  warehouse: string;
}