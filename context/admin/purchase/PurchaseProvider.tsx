"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { PurchaseContext, PurchaseReducer } from "./";

import { PurchaseOrderAPI, RawMaterialAPI, SupplierAPI } from "@/api";
import toast from "react-hot-toast";
import { CreatePurchaseOrderDTO, CreateRawMaterialDTO, CreateSupplierDTO, PurchaseOrderDTO, RawMaterialDTO, SuccessResponseDTO, SupplierDTO, UpdateRawMaterialDTO } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface PurchaseState {
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
}

const Purchase_INITIAL_STATE: PurchaseState = {
  supplier: {
    suppliers: [],
    selected: null,
    loading: false
  },
  rawMaterial: {
    rawMaterials: [],
    selected: null,
    loading: false
  },
  purchaseOrder: {
    purchaseOrders: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export const PurchaseProvider: FC<Props> = ({ children }) => {
  const { isLogged, accessType } = useAuth();
  const [state, dispatch] = useReducer(PurchaseReducer, Purchase_INITIAL_STATE);

  React.useEffect(() => {
    if(!isLogged) return;
    if(accessType === "CLIENT" || accessType === 'TRANSPORT') return;

    dispatch({
      type: "[Purchase] - Loading",
      payload: true,
    });
    (async () => {
      await loadPurchaseOrders();
      await loadRawMaterials();
      await loadSuppliers();
    })();
    dispatch({
      type: "[Purchase] - Loading",
      payload: false,
    });
  }, [isLogged, accessType]);

  const loadSuppliers = async () => {
    const response = await SupplierAPI.getAll();
    if (response?.success) {
      const data = response as SuccessResponseDTO<SupplierDTO[]>;
      dispatch({
        type: "[Purchase] - Load Supplier",
        payload: data?.content,
      });
    }
  }

  const loadRawMaterials = async () => {
    const response = await RawMaterialAPI.getAll();
    if (response?.success) {
      const data = response as SuccessResponseDTO<RawMaterialDTO[]>;
      dispatch({
        type: "[Purchase] - Load RawMaterial",
        payload: data?.content,
      });
    }
  }

  const loadPurchaseOrders = async () => {
    const response = await PurchaseOrderAPI.getAll();
    if (response?.success) {
      const data = response as SuccessResponseDTO<PurchaseOrderDTO[]>;
      dispatch({
        type: "[Purchase] - Load PurchaseOrder",
        payload: data?.content,
      });
    }
  }

  const onSelectSupplier = (supplier: SupplierDTO | null) => {
    dispatch({
      type: "[Purchase] - Select Supplier",
      payload: supplier,
    });
  };

  const onSelectRawMaterial = (rawMaterial: RawMaterialDTO | null) => {
    dispatch({
      type: "[Purchase] - Select RawMaterial",
      payload: rawMaterial,
    });
  };

  const onSelectPurchaseOrder = (purchaseOrder: PurchaseOrderDTO | null) => {
    dispatch({
      type: "[Purchase] - Select PurchaseOrder",
      payload: purchaseOrder,
    });
  };

  const onCreateOrEditSupplier = async (
    type: "Edit" | "Create",
    id: string | null,
    supplier: CreateSupplierDTO | SupplierDTO,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Purchase] - Saving Supplier",
    });

    if (type === "Edit" && id ) {
      const response = await SupplierAPI.update({ ...supplier, id });
      if (response?.success) {
        const data = response as SuccessResponseDTO<SupplierDTO>;
        dispatch({
          type: "[Purchase] - Supplier Updated",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    } else {
      const response = await SupplierAPI.create(supplier);
      if (response?.success) {
        const data = response as SuccessResponseDTO<SupplierDTO>;
        dispatch({
          type: "[Purchase] - Supplier Created",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }
    onTerminate();
  };

  const onCreateOrEditRawMaterial = async (
    type: "Edit" | "Create",
    id: string | null,
    rawMaterial: CreateRawMaterialDTO | UpdateRawMaterialDTO,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Purchase] - Saving RawMaterial",
    });

    if (type === "Edit" && id ) {
      const response = await RawMaterialAPI.update({ ...rawMaterial, id });
      if (response?.success) {
        const data = response as SuccessResponseDTO<RawMaterialDTO>;
        dispatch({
          type: "[Purchase] - RawMaterial Updated",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    } else {
      const response = await RawMaterialAPI.create(rawMaterial);
      if (response?.success) {
        const data = response as SuccessResponseDTO<RawMaterialDTO>;
        dispatch({
          type: "[Purchase] - RawMaterial Created",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }
    onTerminate();
  };

  const onCreatePurchaseOrder = async (
    purchaseOrder: CreatePurchaseOrderDTO,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Purchase] - Saving PurchaseOrder",
    });
    const response = await PurchaseOrderAPI.create( purchaseOrder );
    if (response?.success) {
      const data = response as SuccessResponseDTO<PurchaseOrderDTO>;
      dispatch({
        type: "[Purchase] - PurchaseOrder Created",
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
    <PurchaseContext.Provider
      value={{
        ...state,
        onSelectSupplier,
        onSelectRawMaterial,
        onSelectPurchaseOrder,
        onCreateOrEditSupplier,
        onCreateOrEditRawMaterial,
        onCreatePurchaseOrder,
        loadSuppliers,
        loadRawMaterials,
        loadPurchaseOrders,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};