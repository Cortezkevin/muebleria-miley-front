"use client";

import { IUsersTableCell } from "@/app/admin/users/page";
import {
  CategoryDTO,
  CreateCategoryModal,
  CreateProductModal,
  CreateSubCategoryModal,
  CreateUserModal,
  MinimalUserDTO,
  ProductDTO,
  SubCategoryDTO,
  UpdateCategoryModal,
  UpdateSubCategoryModal,
  UpdateUserModal,
  UserDTO,
} from "@/types";
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
  user: {
    users: MinimalUserDTO[];
    loading: boolean;
    selected: MinimalUserDTO | null;
  };

  loadingData: boolean;

  loadUsers: () => void;

  onSelectCategory: (category: CategoryDTO | null) => void;
  onSelectSubCategory: (subCategory: SubCategoryDTO | null) => void;
  onSelectProduct: (product: ProductDTO | null) => void;
  onSelectUser: (user: IUsersTableCell | null) => void;

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
  onCreateOrEditUser: (
    type: "Edit" | "Create",
    user: CreateUserModal | UpdateUserModal,
    onTerminate: () => void
  ) => void;
}
export const StoreContext = createContext({} as StoreProps);
