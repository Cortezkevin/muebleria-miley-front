"use client";

import { AddItem, CartDTO, CartItemDTO, RemoveItem } from '@/types';
import { createContext } from 'react';

export interface CartProps {
  id: string;
  items: CartItemDTO[];
  count: number;
  tax: string;
  distance: number;
  shippingCost: string;
  discount: string;
  subtotal: string;
  total: string;
  loadingItems: boolean;
  isAddingItem: boolean;
  isRemovingItem: boolean;

  onAddItem: ( newItem: AddItem ) => void;
  onAddMemoryItem: ( newItem: CartItemDTO ) => void;
  onRemoveItem: ( itemToRemove: RemoveItem ) => void;
  onRemoveMemoryItem: ( removeItem: { productId: string, amount: number, removeAll: boolean } ) => void;
  onChangeShippingCost: ( cost: string, distance: number ) => void;
  onChangeShippingCostMemory: ( cost: string) => void;
  onChangeCart: (cart:CartDTO) => void;
  onClear: () => void;
}
export const CartContext = createContext({} as CartProps);