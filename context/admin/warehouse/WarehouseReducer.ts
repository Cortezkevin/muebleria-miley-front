import { MovementsDTO, WarehouseDTO } from "@/types";
import { WarehouseState } from "./";

type WarehouseAction =
  | {
      type: "[Warehouse] - Loading";
      payload: boolean;
    }
  | {
      type: "[Warehouse] - Load Movements";
      payload: MovementsDTO[];
    }
  | {
      type: "[Warehouse] - Saving Movement";
    }
  | {
      type: "[Warehouse] - Movement Created";
      payload: MovementsDTO;
    }
  | {
      type: "[Warehouse] - Movement Updated";
      payload: MovementsDTO;
    }
  | {
      type: "[Warehouse] - Select Movement";
      payload: MovementsDTO | null;
    }
  | {
      type: "[Warehouse] - Load Warehouse";
      payload: WarehouseDTO[];
    }
  | {
      type: "[Warehouse] - Saving Warehouse";
    }
  | {
      type: "[Warehouse] - Warehouse Created";
      payload: WarehouseDTO;
    }
  | {
      type: "[Warehouse] - Warehouse Updated";
      payload: WarehouseDTO;
    }
  | {
      type: "[Warehouse] - Select Warehouse";
      payload: WarehouseDTO | null;
    };

export const WarehouseReducer = (
  state: WarehouseState,
  action: WarehouseAction
): WarehouseState => {
  switch (action.type) {
    case "[Warehouse] - Loading":
      return {
        ...state,
        loadingData: action.payload,
      };
    case "[Warehouse] - Load Movements":
      return {
        ...state,
        movement: {
          ...state.movement,
          movements: action.payload,
        },
      };
      case "[Warehouse] - Select Movement":
        return {
          ...state,
          movement: {
            ...state.movement,
            selected:
              state.movement.movements.find(
                (u: MovementsDTO) => u.id === action.payload?.id
              ) || null,
          },
        };
      case "[Warehouse] - Saving Movement":
        return {
          ...state,
          movement: {
            ...state.movement,
            loading: true,
          },
        };
      case "[Warehouse] - Movement Updated":
        return {
          ...state,
          movement: {
            movements: state.movement.movements.map((c: MovementsDTO) => {
              if (c.id === action.payload.id) {
                return action.payload;
              }
              return c;
            }),
            selected: null,
            loading: false,
          },
        };
      case "[Warehouse] - Movement Created":
        return {
          ...state,
          movement: {
            movements: [...state.movement.movements, action.payload],
            selected: null,
            loading: false,
          },
        };
    case "[Warehouse] - Load Warehouse":
      return {
        ...state,
        warehouse: {
          ...state.warehouse,
          warehouses: action.payload,
        },
      };
    case "[Warehouse] - Select Warehouse":
      return {
        ...state,
        warehouse: {
          ...state.warehouse,
          selected:
            state.warehouse.warehouses.find(
              (u: WarehouseDTO) => u.id === action.payload?.id
            ) || null,
        },
      };
    case "[Warehouse] - Saving Warehouse":
      return {
        ...state,
        warehouse: {
          ...state.warehouse,
          loading: true,
        },
      };
    case "[Warehouse] - Warehouse Updated":
      return {
        ...state,
        warehouse: {
          warehouses: state.warehouse.warehouses.map((c: WarehouseDTO) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Warehouse] - Warehouse Created":
      return {
        ...state,
        warehouse: {
          warehouses: [...state.warehouse.warehouses, action.payload],
          selected: null,
          loading: false,
        },
      };
    default:
      return state;
  }
};
