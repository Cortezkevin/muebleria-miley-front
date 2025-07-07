"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { EmployeeContext, EmployeeReducer } from "./";

import { CarrierAPI, GrocerAPI } from "@/api";
import toast from "react-hot-toast";
import { CarrierDTO, GrocerDTO, NewCarrierDTO, NewGrocerDTO, SuccessResponseDTO } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface EmployeeState {
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
}

const Employee_INITIAL_STATE: EmployeeState = {
  carrier: {
    carriers: [],
    selected: null,
    loading: false
  },
  grocer: {
    grocers: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export const EmployeeProvider: FC<Props> = ({ children }) => {
  const { isLogged, accessType } = useAuth();
  const [state, dispatch] = useReducer(EmployeeReducer, Employee_INITIAL_STATE);
  
  React.useEffect(() => {
    if(!isLogged) return;
    if(accessType === 'CLIENT') return;

    dispatch({
      type: "[Employee] - Loading",
      payload: true,
    });
    (async () => {
      await loadGrocers();
      await loadCarriers();
    })();
    dispatch({
      type: "[Employee] - Loading",
      payload: false,
    });
  }, [isLogged, accessType]);

  const loadCarriers = async () => {
    const response = await CarrierAPI.getAll();
    if (response?.success) {
      const data = response as SuccessResponseDTO<CarrierDTO[]>;
      dispatch({
        type: "[Employee] - Load Carrier",
        payload: data?.content,
      });
    }
  }

  const loadGrocers = async () => {
    const response = await GrocerAPI.getAll();
    if (response?.success) {
      const data = response as SuccessResponseDTO<GrocerDTO[]>;
      dispatch({
        type: "[Employee] - Load Grocer",
        payload: data?.content,
      });
    }
  }

  const onSelectCarrier = (carrier: CarrierDTO | null) => {
    dispatch({
      type: "[Employee] - Select Carrier",
      payload: carrier,
    });
  };

  const onSelectGrocer = (grocer: GrocerDTO | null) => {
    dispatch({
      type: "[Employee] - Select Grocer",
      payload: grocer,
    });
  };

  const onCreateCarrier = async (
    carrier: NewCarrierDTO,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Employee] - Saving Carrier",
    });
    const response = await CarrierAPI.create( carrier );
    if (response?.success) {
      const data = response as SuccessResponseDTO<CarrierDTO>;
      dispatch({
        type: "[Employee] - Carrier Created",
        payload: data.content,
      });
      toast.success(data.message);
      onTerminate();
      return;
    }
    toast.error(response!.message);
    onTerminate();
  };

  const onCreateGrocer = async (
    grocer: NewGrocerDTO,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Employee] - Saving Grocer",
    });
    const response = await GrocerAPI.create( grocer );
    if (response?.success) {
      const data = response as SuccessResponseDTO<GrocerDTO>;
      dispatch({
        type: "[Employee] - Grocer Created",
        payload: data.content,
      });
      toast.success(data.message);
      onTerminate();
      return;
    }
    toast.error(response!.message);
    onTerminate();
  };

  return (
    <EmployeeContext.Provider
      value={{
        ...state,
        onSelectCarrier,
        onSelectGrocer,
        onCreateCarrier,
        onCreateGrocer,
        loadCarriers,
        loadGrocers,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};