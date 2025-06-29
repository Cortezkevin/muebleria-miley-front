import { PurchaseState } from "./";
import { PurchaseOrderDTO, RawMaterialDTO, SupplierDTO, WarehouseDTO } from "@/types";

type PurchaseAction =
  | {
      type: "[Purchase] - Loading";
      payload: boolean;
    }
  | {
      type: "[Purchase] - Load Supplier";
      payload: SupplierDTO[];
    }
  | {
      type: "[Purchase] - Saving Supplier";
    }
  | {
      type: "[Purchase] - Supplier Created";
      payload: SupplierDTO;
    }
  | {
      type: "[Purchase] - Supplier Updated";
      payload: SupplierDTO;
    }
  | {
      type: "[Purchase] - Select Supplier";
      payload: SupplierDTO | null;
    }
  | {
      type: "[Purchase] - Load PurchaseOrder";
      payload: PurchaseOrderDTO[];
    }
  | {
      type: "[Purchase] - Saving PurchaseOrder";
    }
  | {
      type: "[Purchase] - PurchaseOrder Created";
      payload: PurchaseOrderDTO;
    }
  | {
      type: "[Purchase] - Select PurchaseOrder";
      payload: PurchaseOrderDTO | null;
    }
  | {
      type: "[Purchase] - Load RawMaterial";
      payload: RawMaterialDTO[];
    }
  | {
      type: "[Purchase] - Saving RawMaterial";
    }
  | {
      type: "[Purchase] - RawMaterial Created";
      payload: RawMaterialDTO;
    }
  | {
      type: "[Purchase] - RawMaterial Updated";
      payload: RawMaterialDTO;
    }
  | {
      type: "[Purchase] - Select RawMaterial";
      payload: RawMaterialDTO | null;
    };

export const PurchaseReducer = (
  state: PurchaseState,
  action: PurchaseAction
): PurchaseState => {
  switch (action.type) {
    case "[Purchase] - Loading":
      return {
        ...state,
        loadingData: action.payload,
      };
    case "[Purchase] - Load Supplier":
      return {
        ...state,
        supplier: {
          ...state.supplier,
          suppliers: action.payload,
        },
      };
    case "[Purchase] - Select Supplier":
      return {
        ...state,
        supplier: {
          ...state.supplier,
          selected:
            state.supplier.suppliers.find(
              (u: SupplierDTO) => u.id === action.payload?.id
            ) || null,
        },
      };
    case "[Purchase] - Saving Supplier":
      return {
        ...state,
        supplier: {
          ...state.supplier,
          loading: true,
        },
      };
    case "[Purchase] - Supplier Updated":
      return {
        ...state,
        supplier: {
          suppliers: state.supplier.suppliers.map((c: SupplierDTO) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Purchase] - Supplier Created":
      return {
        ...state,
        supplier: {
          suppliers: [...state.supplier.suppliers, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Purchase] - Load RawMaterial":
      return {
        ...state,
        rawMaterial: {
          ...state.rawMaterial,
          rawMaterials: action.payload,
        },
      };
    case "[Purchase] - Select RawMaterial":
      return {
        ...state,
        rawMaterial: {
          ...state.rawMaterial,
          selected:
            state.rawMaterial.rawMaterials.find(
              (u: RawMaterialDTO) => u.id === action.payload?.id
            ) || null,
        },
      };
    case "[Purchase] - Saving RawMaterial":
      return {
        ...state,
        rawMaterial: {
          ...state.rawMaterial,
          loading: true,
        },
      };
    case "[Purchase] - RawMaterial Updated":
      return {
        ...state,
        rawMaterial: {
          rawMaterials: state.rawMaterial.rawMaterials.map(
            (c: RawMaterialDTO) => {
              if (c.id === action.payload.id) {
                return action.payload;
              }
              return c;
            }
          ),
          selected: null,
          loading: false,
        },
      };
    case "[Purchase] - RawMaterial Created":
      return {
        ...state,
        rawMaterial: {
          rawMaterials: [...state.rawMaterial.rawMaterials, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Purchase] - Load PurchaseOrder":
      return {
        ...state,
        purchaseOrder: {
          ...state.purchaseOrder,
          purchaseOrders: action.payload,
        },
      };
    case "[Purchase] - Select PurchaseOrder":
      return {
        ...state,
        purchaseOrder: {
          ...state.purchaseOrder,
          selected:
            state.purchaseOrder.purchaseOrders.find(
              (u: PurchaseOrderDTO) => u.id === action.payload?.id
            ) || null,
        },
      };
    case "[Purchase] - Saving PurchaseOrder":
      return {
        ...state,
        purchaseOrder: {
          ...state.purchaseOrder,
          loading: true,
        },
      };
    case "[Purchase] - PurchaseOrder Created":
      return {
        ...state,
        purchaseOrder: {
          purchaseOrders: [
            ...state.purchaseOrder.purchaseOrders,
            action.payload,
          ],
          selected: null,
          loading: false,
        },
      };
    default:
      return state;
  }
};
