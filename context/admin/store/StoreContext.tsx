"use client";

import {
  CategoryDTO,
  ProductDTO,
  SubCategoryDTO,
  CreateCategoryDTO,
  CreateProductDTO,
  CreateSubCategoryDTO,
  UpdateCategoryDTO,
  //UpdateProduct,
  UpdateSubCategoryDTO,
} from "@/types";
import { CreateCategoryModal, UpdateCategoryModal } from "@/types/admin/category";
import { CreateProductModal } from "@/types/admin/product";
import { CreateSubCategoryModal, UpdateSubCategoryModal } from "@/types/admin/subcategory";
//import { IUsersTableCell } from "@/declarations/table/users";
import { createContext } from "react";

export interface StoreProps {
  category: {
    categories: CategoryDTO[];
    loading: boolean;
    selected: CategoryDTO | null;
  };
  subcategory: {
    subcategories: SubCategoryDTO[];
    loading: boolean;
    selected: SubCategoryDTO | null;
  };
  product: {
    products: ProductDTO[];
    loading: boolean;
    selected: ProductDTO | null;
  };
  /*user: {
    users: IUser[];
    loading: boolean;
    selected: IUser | null;
  };*/

  loadingData: boolean;

  loadUsers: () => void;

  onSelectCategory: (category: CategoryDTO | null) => void;
  onSelectSubCategory: (subCategory: SubCategoryDTO | null) => void;
  onSelectProduct: (product: ProductDTO | null) => void;
 // onSelectUser: (user: IUsersTableCell | null) => void;

  onCreateOrEditCategory: (
    type: "Edit" | "Create",
    id: string | null,
    category: CreateCategoryModal | UpdateCategoryModal,
    onTerminate: () => void
  ) => void;

  onCreateOrEditSubCategory: (
    type: "Edit" | "Create",
    subcategory: CreateSubCategoryModal | UpdateSubCategoryModal,
    onTerminate: () => void
  ) => void;

  onCreateOrEditProduct: (
    type: "Edit" | "Create",
    product: CreateProductModal | any,
    onTerminate: () => void
  ) => void;
/*
  onCreateOrEditUser: (
    type: "Edit" | "Create",
    user: CreateUser | UpdateUser,
    onTerminate: () => void
  ) => void;*/
}
export const StoreContext = createContext({} as StoreProps);
