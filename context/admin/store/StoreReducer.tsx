import {
  CategoryDTO,
  ProductDTO,
  SubCategoryDTO,
  UserDTO,
  //IUser,
} from "@/types";
import { StoreState } from ".";
import { IUsersTableCell } from "@/app/admin/users/page";
//import { IUsersTableCell } from "@/declarations/table/users";

type StoreAction =
  | {
      type: "[Store] - Loading";
      payload: boolean;
    }
  | {
      type: "[Store] - Load Categories";
      payload: CategoryDTO[];
    }
  | {
      type: "[Store] - Saving Category";
    }
  | {
      type: "[Store] - Category Created";
      payload: CategoryDTO;
    }
  | {
      type: "[Store] - Category Updated";
      payload: CategoryDTO;
    }
  | {
      type: "[Store] - Select Category";
      payload: CategoryDTO | null;
    }
  | {
      type: "[Store] - Load SubCategories";
      payload: SubCategoryDTO[];
    }
  | {
      type: "[Store] - Saving SubCategory";
    }
  | {
      type: "[Store] - SubCategory Created";
      payload: SubCategoryDTO;
    }
  | {
      type: "[Store] - SubCategory Updated";
      payload: SubCategoryDTO;
    }
  | {
      type: "[Store] - Select SubCategory";
      payload: SubCategoryDTO | null;
    }
  | {
      type: "[Store] - Load Products";
      payload: ProductDTO[];
    }
  | {
      type: "[Store] - Saving Product";
    }
  | {
      type: "[Store] - Product Created";
      payload: ProductDTO;
    }
  | {
      type: "[Store] - Product Updated";
      payload: ProductDTO;
    }
  | {
      type: "[Store] - Select Product";
      payload: ProductDTO | null;
    }
  | {
      type: "[Store] - Load Users";
      payload: UserDTO[];
    }
  | {
      type: "[Store] - Saving User";
    }
  | {
      type: "[Store] - User Updated";
      payload: UserDTO;
    }
  | {
      type: "[Store] - User Created";
      payload: UserDTO;
    }
  | {
      type: "[Store] - Select User";
      payload: IUsersTableCell | null;
    };

export const StoreReducer = (
  state: StoreState,
  action: StoreAction
): StoreState => {
  switch (action.type) {
    case "[Store] - Loading" :
      return {
        ...state,
        loadingData: action.payload
      };
    case "[Store] - Load Categories":
      return {
        ...state,
        category: {
          ...state.category,
          categories: action.payload,
        },
      };
    case "[Store] - Select Category":
      return {
        ...state,
        category: {
          ...state.category,
          selected: action.payload,
        },
      };
    case "[Store] - Saving Category":
      return {
        ...state,
        category: {
          ...state.category,
          loading: true,
        },
      };
    case "[Store] - Category Updated":
      return {
        ...state,
        category: {
          categories: state.category.categories.map((c: CategoryDTO) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Category Created":
      return {
        ...state,
        category: {
          categories: [...state.category.categories, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Load SubCategories":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          subcategories: action.payload,
        },
      };
    case "[Store] - Select SubCategory":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          selected: action.payload,
        },
      };
    case "[Store] - Saving SubCategory":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          loading: true,
        },
      };
    case "[Store] - SubCategory Updated":
      return {
        ...state,
        subcategory: {
          subcategories: state.subcategory.subcategories.map((c: SubCategoryDTO) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Store] - SubCategory Created":
      return {
        ...state,
        subcategory: {
          subcategories: [...state.subcategory.subcategories, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Load Products":
      return {
        ...state,
        product: {
          ...state.product,
          products: action.payload,
        },
      };
    case "[Store] - Select Product":
      return {
        ...state,
        product: {
          ...state.product,
          selected: action.payload,
        },
      };
    case "[Store] - Saving Product":
      return {
        ...state,
        product: {
          ...state.product,
          loading: true,
        },
      };
    case "[Store] - Product Updated":
      return {
        ...state,
        product: {
          products: state.product.products.map((c: ProductDTO) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Product Created":
      return {
        ...state,
        product: {
          products: [...state.product.products, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Loading":
      return {
        ...state,
        loadingData: action.payload,
      };
    case "[Store] - Load Users":
      return {
        ...state,
        user: {
          ...state.user,
          users: action.payload,
        },
      };
    case "[Store] - Select User":
      return {
        ...state,
        user: {
          ...state.user,
          selected:
            state.user.users.find((u: UserDTO) => u.id === action.payload?.id) || null,
        },
      };
    case "[Store] - Saving User":
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case "[Store] - User Updated":
      return {
        ...state,
        user: {
          users: state.user.users.map((u: UserDTO) => {
            if (u.id === action.payload.id) {
              return action.payload;
            }
            return u;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Store] - User Created":
      return {
        ...state,
        user: {
          users: [...state.user.users, action.payload],
          selected: null,
          loading: false,
        },
      };
    default:
      return state;
  }
};
