"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { WarehouseContext, WarehouseReducer } from "./";

import { MovementsAPI, WarehouseAPI } from "@/api";
import toast from "react-hot-toast";
import { MovementsDTO, WarehouseDTO, CreateInventoryMovementDTO, UpdateInventoryMovementDTO, SuccessResponseDTO } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface WarehouseState {
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
  loadingData: boolean;
}

const Warehouse_INITIAL_STATE: WarehouseState = {
  warehouse: {
    warehouses: [],
    selected: null,
    loading: false
  },
  movement: {
    movements: [],
    loading: false,
    selected: null
  },
  loadingData: false,
};

export const WarehouseProvider: FC<Props> = ({ children }) => {
  const { isLogged, accessType } = useAuth();
  const [state, dispatch] = useReducer(WarehouseReducer, Warehouse_INITIAL_STATE);

  React.useEffect(() => {
    if(!isLogged) return;
    if(accessType === 'CLIENT' || accessType === 'TRANSPORT') return;
    
    dispatch({
      type: "[Warehouse] - Loading",
      payload: true,
    });
    (async () => {
      await loadWarehouses();
      await loadMovements();
    })();
    dispatch({
      type: "[Warehouse] - Loading",
      payload: false,
    });
  }, [isLogged, accessType]);

  const loadWarehouses = async () => {
    const response = await WarehouseAPI.getAll();
    if (response?.success) {
      const data = response as SuccessResponseDTO<WarehouseDTO[]>;
      dispatch({
        type: "[Warehouse] - Load Warehouse",
        payload: data.content,
      });
    }
  }

  const loadMovements = async () => {
    const response = await MovementsAPI.getAll();
    if (response?.success) {
      const data = response as SuccessResponseDTO<MovementsDTO[]>;
      dispatch({
        type: "[Warehouse] - Load Movements",
        payload: data.content,
      });
    }
  }

  const onSelectWarehouse = (warehouse: WarehouseDTO | null) => {
    dispatch({
      type: "[Warehouse] - Select Warehouse",
      payload: warehouse,
    });
  };

  const onSelectMovement = (movement: MovementsDTO | null) => {
    dispatch({
      type: "[Warehouse] - Select Movement",
      payload: movement,
    });
  };

  const onCreateOrEditWarehouse = async (
    type: "Edit" | "Create",
    id: string | null,
    warehouse: string | WarehouseDTO,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Warehouse] - Saving Warehouse",
    });

    if (type === "Edit" && id ) {
      const response = await WarehouseAPI.update({...warehouse as WarehouseDTO, id});
      if (response?.success) {
        const data = response as SuccessResponseDTO<WarehouseDTO>;
        dispatch({
          type: "[Warehouse] - Warehouse Updated",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response.message);
    } else {
      const response = await WarehouseAPI.create(warehouse as string);
      if (response?.success) {
        const data = response as SuccessResponseDTO<WarehouseDTO>;
        dispatch({
          type: "[Warehouse] - Warehouse Created",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response.message);
    }
    onTerminate();
  };

  const onCreateOrEditMovement = async (
    type: "Edit" | "Create",
    id: string | null,
    movement: CreateInventoryMovementDTO | UpdateInventoryMovementDTO,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Warehouse] - Saving Movement",
    });

    if (type === "Edit" && id ) {
      const response = await MovementsAPI.update({...movement as UpdateInventoryMovementDTO, id});
      if (response?.success) {
        const data = response as SuccessResponseDTO<MovementsDTO>;
        dispatch({
          type: "[Warehouse] - Movement Updated",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response.message);
    } else {
      const response = await MovementsAPI.create(movement as CreateInventoryMovementDTO);
      if (response?.success) {
        const data = response as SuccessResponseDTO<MovementsDTO[]>;
        (data.content as MovementsDTO[]).forEach( i => {
          dispatch({
            type: "[Warehouse] - Movement Created",
            payload: i,
          });
        })
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response.message);
    }
    onTerminate();
  };


  return (
    <WarehouseContext.Provider
      value={{
        ...state,
        onSelectWarehouse,
        onSelectMovement,
        onCreateOrEditWarehouse,
        onCreateOrEditMovement,
        loadWarehouses,
        loadMovements
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};