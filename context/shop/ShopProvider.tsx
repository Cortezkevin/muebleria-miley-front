"use client";

import { ReactElement, useEffect, useReducer } from "react";
import { ShopContext, ShopReducer } from "./";
import { CategoryDTO, ProductDTO, SuccessResponseDTO } from "@/types";
import { CategoryAPI, ProductAPI } from "@/api";
import toast from "react-hot-toast";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface ShopState {
  products: {
    loading: boolean;
    data: ProductDTO[];
  };
  categories: {
    loading: boolean;
    data: CategoryDTO[];
  };
}

const Shop_INITIAL_STATE: ShopState = {
  products: {
    loading: false,
    data: [],
  },
  categories: {
    loading: false,
    data: [],
  },
};

export default function ShopProvider({ children }: Props) {
  const [state, dispatch] = useReducer(ShopReducer, Shop_INITIAL_STATE);

  useEffect(() => {
    handleLoadCategories();
    handleLoadProducts();
  },[]);

  const handleLoadProducts = async () => {
    dispatch({
      type: "[Shop] - Loading Products",
      payload: true
    });
    const response = await ProductAPI.getAll();
    if( response?.success ){
      const data = response as SuccessResponseDTO<ProductDTO[]>;
      dispatch({
        type: "[Shop] - Products Loaded",
        payload: data.content
      });
    }else {
      dispatch({
        type: "[Shop] - Loading Products",
        payload: false
      });
      toast.error(response?.message || "Ocurrio un error");
    }
  };

  const handleLoadCategories = async () => {
    dispatch({
      type: "[Shop] - Loading Categories",
      payload: true
    });
    const response = await CategoryAPI.getAll();
    if( response?.success ){
      const data = response as SuccessResponseDTO<CategoryDTO[]>;
      dispatch({
        type: "[Shop] - Categories Loaded",
        payload: data.content
      });
    }else {
      dispatch({
        type: "[Shop] - Loading Categories",
        payload: false
      });
      toast.error(response?.message || "Ocurrio un error");
    }
  };

  return (
    <ShopContext.Provider
      value={{
        ...state,
        loadCategories: handleLoadCategories,
        loadProducts: handleLoadProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
