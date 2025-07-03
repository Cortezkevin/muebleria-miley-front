
import { EmployeeState } from "./";
import { CarrierDTO, GrocerDTO } from "@/types";

type EmployeeAction =
  | {
      type: "[Employee] - Loading";
      payload: boolean;
    }
  | {
      type: "[Employee] - Load Carrier";
      payload: CarrierDTO[];
    }
  | {
      type: "[Employee] - Saving Carrier";
    }
  | {
      type: "[Employee] - Carrier Created";
      payload: CarrierDTO;
    }
  | {
      type: "[Employee] - Select Carrier";
      payload: CarrierDTO | null;
    }
  | {
      type: "[Employee] - Load Grocer";
      payload: GrocerDTO[];
    }
  | {
      type: "[Employee] - Saving Grocer";
    }
  | {
      type: "[Employee] - Grocer Created";
      payload: GrocerDTO;
    }
  | {
      type: "[Employee] - Select Grocer";
      payload: GrocerDTO | null;
    };

export const EmployeeReducer = (
  state: EmployeeState,
  action: EmployeeAction
): EmployeeState => {
  switch (action.type) {
      case "[Employee] - Loading":
        return {
          ...state,
          loadingData: action.payload
        }
      case "[Employee] - Load Carrier":
        return {
          ...state,
          carrier: {
            ...state.carrier,
            carriers: action.payload,
          },
        };
      case "[Employee] - Select Carrier":
        return {
          ...state,
          carrier: {
            ...state.carrier,
            selected:
              state.carrier.carriers.find((u: CarrierDTO) => u.id === action.payload?.id) || null,
          },
        };
      case "[Employee] - Saving Carrier":
        return {
          ...state,
          carrier: {
            ...state.carrier,
            loading: true,
          },
        };
      case "[Employee] - Carrier Created":
        return {
          ...state,
          carrier: {
            carriers: [...state.carrier.carriers, action.payload],
            selected: null,
            loading: false,
          },
        };
        case "[Employee] - Load Grocer":
          return {
            ...state,
            grocer: {
              ...state.grocer,
              grocers: action.payload,
            },
          };
        case "[Employee] - Select Grocer":
          return {
            ...state,
            grocer: {
              ...state.grocer,
              selected:
                state.grocer.grocers.find((u:GrocerDTO) => u.id === action.payload?.id) || null,
            },
          };
        case "[Employee] - Saving Grocer":
          return {
            ...state,
            grocer: {
              ...state.grocer,
              loading: true,
            },
          };
        case "[Employee] - Grocer Created":
          return {
            ...state,
            grocer: {
              grocers: [...state.grocer.grocers, action.payload],
              selected: null,
              loading: false,
            },
          };
    default:
      return state;
  }
};
