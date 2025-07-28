"use client";

import React, { FC, ReactElement } from "react";
import { StoreContext, StoreReducer } from ".";
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
  SuccessResponseDTO,
  UserDTO,
  CreateUserModal,
  UpdateUserModal,
  MinimalUserDTO,
} from "@/types";
import { CategoryAPI, ProductAPI, SubCategoryAPI, UserAPI } from "@/api";
import toast from "react-hot-toast";
import { CreateCategoryModal, UpdateCategoryModal } from "@/types/admin/category";
import { CreateSubCategoryModal, UpdateSubCategoryModal } from "@/types/admin/subcategory";
import { CreateProductModal } from "@/types/admin/product";
import { useAuth } from "@/hooks/useAuth";
//import { IUsersTableCell } from "@/declarations/table/users";

interface Props {
  children: ReactElement | ReactElement[];
}

export interface StoreState {
  category: {
    categories: CategoryDTO[];
    selected: CategoryDTO | null;
    loading: boolean;
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
}

const STORE_INITIAL_STATE: StoreState = {
  category: {
    categories: [],
    selected: null,
    loading: false,
  },
  subcategory: {
    subcategories: [],
    selected: null,
    loading: false,
  },
  product: {
    products: [],
    selected: null,
    loading: false,
  },
  user: {
    users: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export function StoreProvider ({ children }: Props) {
  const { isLogged, accessType } = useAuth();
  const [state, dispatch] = React.useReducer(StoreReducer, STORE_INITIAL_STATE);

  React.useEffect(() => {
    if(!isLogged) return;
    if(accessType === "CLIENT" || accessType === 'TRANSPORT') return;
    
    dispatch({
      type: "[Store] - Loading",
      payload: true
    });
    
    (async () => {
      const categoriesResponse = await CategoryAPI.getAll();
      if (categoriesResponse?.success) {
        const categories = categoriesResponse as SuccessResponseDTO<CategoryDTO[]>;
        dispatch({
          type: "[Store] - Load Categories",
          payload: categories?.content,
        });
      }
      const subcategoriesResponse = await SubCategoryAPI.getAll();
      if (subcategoriesResponse?.success) {
        const subcategories = subcategoriesResponse as SuccessResponseDTO<SubCategoryDTO[]>;
        dispatch({
          type: "[Store] - Load SubCategories",
          payload: subcategories?.content,
        });
      }
      const productsResponse = await ProductAPI.getAll();
      if (productsResponse?.success) {
        const products = productsResponse as SuccessResponseDTO<ProductDTO[]>;
        dispatch({
          type: "[Store] - Load Products",
          payload: products?.content,
        });
      }
      await loadUsers();
    })();
    dispatch({
      type: "[Store] - Loading",
      payload: false,
    });
  }, [isLogged, accessType]);

  const loadUsers = async () => {
    const response = await UserAPI.getUsers();
    if (response?.success) {
      const data = response as SuccessResponseDTO<UserDTO[]>;
      dispatch({
        type: "[Store] - Load Users",
        payload: data?.content,
      });
    }
  }

  const onSelectCategory = (category: CategoryDTO | null) => {
    dispatch({
      type: "[Store] - Select Category",
      payload: category,
    });
  };

  const onSelectSubCategory = (subcategory: SubCategoryDTO | null) => {
    dispatch({
      type: "[Store] - Select SubCategory",
      payload: subcategory,
    });
  };

  const onSelectProduct = (product: ProductDTO | null) => {
    console.log("PRODUCT SELECTED CHANGE", product);
    dispatch({
      type: "[Store] - Select Product",
      payload: product,
    });
  };

  const onSelectUser = (user: MinimalUserDTO | null) => {
    dispatch({
      type: "[Store] - Select User",
      payload: user,
    });
  };

  const onCreateOrEditCategory = async (
    type: "Edit" | "Create",
    id: string | null,
    category: CreateCategoryModal | UpdateCategoryModal,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving Category",
    });

    if (type === "Edit" && id) {
      category = category as UpdateCategoryModal;
      const response = await CategoryAPI.update(
        {
          id,
          newName: category.name,
          newDescription: category.description
        },
        category.file
      );
      if (response?.success) {
        const data = response as SuccessResponseDTO<CategoryDTO>;
        dispatch({
          type: "[Store] - Category Updated",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response.message);
    } else {
      const response = await CategoryAPI.create({ name: category.name, description: category.description }, category.file!);
      if (response?.success) {
        const data = response as SuccessResponseDTO<CategoryDTO>;
        dispatch({
          type: "[Store] - Category Created",
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

  const onCreateOrEditSubCategory = async (
    type: "Edit" | "Create",
    subcategory: CreateSubCategoryModal | UpdateSubCategoryModal,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving SubCategory",
    });

    if( type === "Edit" ){
      subcategory = subcategory as UpdateSubCategoryModal;
      const response = await SubCategoryAPI.update(
        {
          id: subcategory.id,
          newName: subcategory.newName,
          newCategoryId: subcategory.newCategoryId,
          newDescription: subcategory.newDescription
        },
        subcategory.file
      );
      if (response?.success) {
        const data = response as SuccessResponseDTO<SubCategoryDTO>;
        dispatch({
          type: "[Store] - SubCategory Updated",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response.message);
    }else {
      subcategory = subcategory as CreateSubCategoryModal;
      const response = await SubCategoryAPI.create(
        {
          name: subcategory.name,
          category_id: subcategory.category_id,
          description: subcategory.description
        },
        subcategory.file!
      );
      if (response?.success) {
        const data = response as SuccessResponseDTO<SubCategoryDTO>;
        dispatch({
          type: "[Store] - SubCategory Created",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response.message);
    }
    onTerminate();
  }

  const onCreateOrEditProduct = async (
    type: "Edit" | "Create",
    product: CreateProductModal | any,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving Product",
    });

    if( type === "Edit" ){
      /*console.log("EDITANDO PRODUCTO" , product);
      const response = await productAPI.update(
        product as UpdateProduct/* ,
        product.files */
      /*);
      if (response?.success) {
        dispatch({
          type: "[Store] - Product Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);*/
    }else {
      product = product as CreateProductModal;
      console.log("PRODUCT TO CREATE", product)
      const response = await ProductAPI.create(
        {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          
          subcategoryId: product.subcategory_id,
          colorImages: product.colorImages,
          features: product.features
          /* colorImages: null,
          features: null */
        },
        product.files
      );
      if (response?.success) {
        const data = response as SuccessResponseDTO<ProductDTO>;
        dispatch({
          type: "[Store] - Product Created",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }
    onTerminate();
  }

  const onCreateOrEditUser = async (
    type: "Edit" | "Create",
    user: CreateUserModal | UpdateUserModal,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving User",
    });
    if( type === "Edit" ){
      const response = await UserAPI.update( user as UpdateUserModal );
      if (response?.success) {
        const data = response as SuccessResponseDTO<UserDTO>;
        dispatch({
          type: "[Store] - User Updated",
          payload: data.content,
        });
        toast.success(data.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }else {
      const response = await UserAPI.create( user as CreateUserModal );
      if (response?.success) {
        const data = response as SuccessResponseDTO<UserDTO>;
        dispatch({
          type: "[Store] - User Created",
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

  return (
    <StoreContext.Provider
      value={{
        ...state,
        onSelectCategory,
       // onSelectCollection,
        onSelectSubCategory,
        onSelectProduct,
        onCreateOrEditCategory,
        //onCreateOrEditCollection,
        onCreateOrEditSubCategory,
        onCreateOrEditProduct,
        onCreateOrEditUser,
        onSelectUser,
        loadUsers
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};