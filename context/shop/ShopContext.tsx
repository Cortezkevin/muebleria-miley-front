"use client";

import { CategoryDTO, ProductDTO } from '@/types';
import { createContext } from 'react';

export interface ShopProps {
  products: {
    loading: boolean;
    data: ProductDTO[];
  };
  categories: {
    loading: boolean;
    data: CategoryDTO[];
  };

  loadProducts: () => void;
  loadCategories: () => void;
}
export const ShopContext = createContext({} as ShopProps);