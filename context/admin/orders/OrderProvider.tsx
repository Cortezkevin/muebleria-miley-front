"use client";

import React, { FC, ReactElement } from "react";
import { OrderContext, OrderReducer, OrderSelectedDTO } from "./";
import {
  OrderDTO,
  SuccessResponseDTO
} from "@/types";
import { OrderAPI } from "@/api";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface OrderState {
  order: {
    orders: OrderDTO[];
    loading: boolean;
    selected: OrderDTO | null;
  };
  loadingData: boolean;
}

const ORDER_INITIAL_STATE: OrderState = {
  order: {
    orders: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export const OrderProvider: FC<Props> = ({ children }) => {
  const { isLogged, accessType } = useAuth();
  const [state, dispatch] = React.useReducer(OrderReducer, ORDER_INITIAL_STATE);

  React.useEffect(() => {
    if(!isLogged) return;
    if(accessType === "CLIENT") return;
    
    dispatch({
      type: "[Order] - Loading",
      payload: true,
    });
    (async () => {
      await loadOrders();
    })();
    dispatch({
      type: "[Order] - Loading",
      payload: false,
    });
  }, [isLogged, accessType]);

  const loadOrders = async () => {
    const response = await OrderAPI.getAllOrders();
    if (response?.success) {
      const data = response as SuccessResponseDTO<OrderDTO[]>;
      dispatch({
        type: "[Order] - Load Orders",
        payload: data?.content,
      });
    }
  }

  const onSelectOrder = (order: OrderSelectedDTO | null) => {
    dispatch({
      type: "[Order] - Select Order",
      payload: order,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        onSelectOrder,
        loadOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};