"use client";

import {
  OrderDTO,

  PaymentMethod,
  ShippingStatus,
  PreparationStatus,
  OrderStatus,
} from "@/types";
import { createContext } from "react";

export type OrderSelectedDTO = {
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

export interface OrderProps {
  order: {
    orders: OrderDTO[];
    loading: boolean;
    selected: OrderDTO | null;
  };
  loadingData: boolean;
  loadOrders: () => void;
  onSelectOrder: (order: OrderSelectedDTO | null) => void;
/*   onEditOrder: (order: UpdateOrder, onTerminate: () => void) => void; */
}
export const OrderContext = createContext({} as OrderProps);
