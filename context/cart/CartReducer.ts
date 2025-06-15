import { CartDTO } from '@/types';
import { CartState } from './'

type CartAction = {
  type: '[Cart] - loading items'
} | {
  type: '[Cart] - adding items'
} | {
  type: '[Cart] - removing items'
} | {
  type: '[Cart] - stop loading'
} | {
  type: '[Cart] - clear'
} | {
  type: '[Cart] - change shipping cost',
  payload: string
} | { 
  type: '[Cart] - load cart',
  payload: CartDTO 
} | { 
  type: '[Cart] - add item',
  payload: CartDTO
} | { 
  type: '[Cart] - remove item',
  payload: CartDTO
};


export const CartReducer = ( state: CartState, action: CartAction ): CartState => {
  switch( action.type ) {
    case '[Cart] - loading items':
      return {
        ...state,
        loadingItems: true
      }
    case '[Cart] - adding items':
      return {
        ...state,
        isAddingItem: true
      }
    case '[Cart] - removing items':
      return {
        ...state,
        isRemovingItem: true
      }
    case '[Cart] - stop loading':
      return {
        ...state,
        loadingItems: false,
        isAddingItem: false,
        isRemovingItem: false
      }
    case '[Cart] - change shipping cost':
      const newTotal = parseFloat(state.subtotal) + parseFloat(action.payload);
      const newTax = newTotal * 0.18;
      return {
        ...state,
        shippingCost: action.payload,
        tax: newTax.toFixed(2),
        total: (newTotal + newTax).toFixed(2)
      }
    case '[Cart] - clear':
      return {
        ...state,
        items: [],
        count: 0,
        tax: "0.00",
        discount: "0.00",
        subtotal: "0.00",
        total: "0.00",
        loadingItems: false,
        isAddingItem: false,
        isRemovingItem: false
      }
    case '[Cart] - load cart':
      return {
        ...state,
        id: action.payload.id,
        count: action.payload.cartItems.length,
        items: action.payload.cartItems,
        tax: action.payload.tax,
        discount: action.payload.discount,
        shippingCost: action.payload.shippingCost,
        subtotal: action.payload.subtotal,
        total: action.payload.total,
        loadingItems: false
      };
    case '[Cart] - add item':
      return {
        ...state,
        id: action.payload.id,
        count: action.payload.cartItems.length,
        items: action.payload.cartItems,
        tax: action.payload.tax,
        discount: action.payload.discount,
        subtotal: action.payload.subtotal,
        total: action.payload.total,
        isAddingItem: false
      };
    case '[Cart] - remove item':
      return {
        ...state,
        id: action.payload.id,
        count: action.payload.cartItems.length,
        items: action.payload.cartItems,
        tax: action.payload.tax,
        discount: action.payload.discount,
        subtotal: action.payload.subtotal,
        total: action.payload.total,
        isRemovingItem: false
      };
    default:
      return state;
  }
}