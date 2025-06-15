"use client";

import React, { FC, ReactElement, ReactNode, useEffect } from 'react';
import { CartContext, CartReducer } from './';
import { AddItem, CartDTO, CartItemDTO, RemoveItem, SuccessResponseDTO } from '@/types';
import { CartAPI } from '@/api';
import toast from 'react-hot-toast';
import { AuthContext } from '../auth';
import Cookies from 'js-cookie';

interface Props {
  children: ReactElement | ReactElement[];
}
export interface CartState {
  id: string;
  items: CartItemDTO[];
  count: number;
  tax: string;
  discount: string;
  subtotal: string;
  total: string;
  distance: number;
  shippingCost: string;
  loadingItems: boolean;
  isAddingItem: boolean;
  isRemovingItem: boolean;
}

const Cart_INITIAL_STATE: CartState = {
  id: "",
  items: [],
  count: 0,
  tax: "0.00",
  discount: "0.00",
  subtotal: "0.00",
  distance: 0.0,
  shippingCost: "0.00",
  total: "0.00",
  loadingItems: false,
  isAddingItem: false,
  isRemovingItem: false
}

export default function CartProvider({ children }: { children: ReactNode }){

  const { isLogged, user: { firstName, id }, validateSession } = React.useContext( AuthContext );
  const [ state, dispatch ] = React.useReducer( CartReducer , Cart_INITIAL_STATE );

  React.useEffect(() => {
    validateSession();
  }, []);

  React.useEffect(() => {
    if( isLogged && (Cookies.get("token") || '').length > 0 ){
      dispatch({
        type: "[Cart] - loading items"
      });
      ( async () => {
        const response = await CartAPI.getCartFromSession( id );
        console.log("RESPOSNE", response)
        if( response?.success ){
          const data = response as SuccessResponseDTO<CartDTO>;
          dispatch({
            type: "[Cart] - load cart",
            payload: data.content
          })
          return;
        }
        dispatch({
          type: "[Cart] - stop loading"
        });
      })();
    }
  }, [isLogged, id]);

  useEffect(() => {
    if(!isLogged){
      dispatch({
        type: "[Cart] - loading items"
      });
      const cart = (JSON.parse(Cookies.get("cart") || 'null')) as CartDTO;
      if( cart ){
        dispatch({
          type: "[Cart] - load cart",
          payload: cart
        })
      }
      dispatch({
        type: "[Cart] - stop loading"
      });
    }
  }, [ isLogged ]);

  useEffect(() => {
    const cart = (JSON.parse(Cookies.get("cart") || 'null')) as CartDTO;
      if( cart === null ){
        const newMemoryCart: CartDTO = {
          id: "",
          user_id : "",
          cartItems: [],
          tax: "0.00",
          distance: 0.0,
          discount: "0.00",
          subtotal: "0.00",
          shippingCost: "0.00",
          total: "0.00"
        }
        Cookies.set("cart", JSON.stringify(newMemoryCart));
        dispatch({
          type: "[Cart] - load cart",
          payload: newMemoryCart
        })
      }
  }, [])

  const handleAddItem = async ( itemToAdd: AddItem ) => {
    dispatch({
      type: "[Cart] - adding items"
    });
    const response = await CartAPI.addItem( itemToAdd );
    if( response?.success ){
      const data = response as SuccessResponseDTO<CartDTO>;
      dispatch({
        type: "[Cart] - add item",
        payload: data.content
      })
      toast.success(data?.message);
      return;
    }
    toast.error(response?.message!);
    dispatch({
      type: "[Cart] - stop loading"
    });
  }

  const handleAddMemoryItem = ( itemToAdd: CartItemDTO ) => {
    let newItems: CartItemDTO[] = [];
    if( state.items.find(i => i.product_id === itemToAdd.product_id) ){
      newItems = state.items.map(i => {
        if(i.product_id === itemToAdd.product_id){
          const newAmount = i.amount + itemToAdd.amount;
          if( newAmount > i.stock ){
            toast.error("La cantidad a agregar supera el stock");
            return i;
          }
          return {
            ...i,
            amount: newAmount,
            total: (parseFloat(i.price) * newAmount).toFixed(2)
          };
        }
        return i;
      });
    }else {
      newItems = [ ...state.items, itemToAdd ];
    }
    
    const subtotal = getSubTotal( newItems );
    const total = getTotal( newItems, state.shippingCost );

    const newCart: CartDTO = {
      id: "",
      user_id: "",
      cartItems: newItems,
      discount: "0.00",
      distance: state.distance,
      subtotal: subtotal,
      shippingCost: state.shippingCost,
      total: total.total,
      tax: total.tax.toFixed(2)
    }

    Cookies.set("cart", JSON.stringify( newCart ));

    dispatch({
      type: "[Cart] - add item",
      payload: newCart
    })
  }

  const handleRemoveMemoryItem = ( removeItem: { productId: string, amount: number, removeAll: boolean } )  => {
    let newItems: CartItemDTO[] = [];
    const itemToRemove = state.items.find(i => i.product_id === removeItem.productId);
    if( itemToRemove ){
      if( removeItem.removeAll || itemToRemove.amount === 1 ){
        newItems = state.items.filter(i => i.product_id != removeItem.productId );
      }else {
        newItems = state.items.map(i => {
          if(i.product_id === removeItem.productId){
            const newAmount = i.amount - removeItem.amount;
            return {
              ...i,
              amount: newAmount,
              total: (parseFloat(i.price) * newAmount).toFixed(2)
            };
          }
          return i;
        });
      }
    }

    const subtotal = getSubTotal( newItems );
    const total = getTotal( newItems, state.shippingCost );

    const newCart: CartDTO = {
      id: state.id,
      user_id: "",
      cartItems: newItems,
      discount: "0.00",
      subtotal: subtotal,
      distance: state.distance,
      shippingCost: state.shippingCost,
      total: total.total,
      tax: total.tax.toFixed(2)
    }
    
    Cookies.set("cart", JSON.stringify( newCart ));

    dispatch({
      type: '[Cart] - remove item',
      payload: newCart
    })
  }

  const getSubTotal = ( items: CartItemDTO[] ) => {
    let total = 0;
    items.forEach(i => {
      total += parseFloat(i.total);
    });
    return total.toFixed(2);
  }

  const getTotal = ( items: CartItemDTO[], shippingCost: string ) => {
    let total = 0;
    items.forEach(i => {
      total += parseFloat(i.total);
    });
    if( total < 2500 ){
      total += parseFloat(shippingCost);
    }
    const tax = total * 0.18;
    total += tax;
    return {
      total: total.toFixed(2),
      tax: tax
    };
  }

  const handleRemoveItem = async ( itemToRemove: RemoveItem ) => {
    dispatch({
      type: "[Cart] - removing items"
    });
    const response = await CartAPI.removeItem( itemToRemove );
    if( response?.success ){
      const data = response as SuccessResponseDTO<CartDTO>;
      dispatch({
        type: "[Cart] - remove item",
        payload: data.content
      })
      toast.success(data?.message);
      return;
    }
    toast.error(response?.message!);
    dispatch({
      type: "[Cart] - stop loading"
    });
  }

  const handleClear = async () => {
    const newMemoryCart: CartDTO = {
      id: "",
      user_id : "",
      cartItems: [],
      tax: "0.00",
      distance: 0.0,
      discount: "0.00",
      subtotal: "0.00",
      shippingCost: "0.00",
      total: "0.00"
    }
    Cookies.set("cart", JSON.stringify(newMemoryCart));

    dispatch({
      type: "[Cart] - clear"
    })
  }

  const handleChangeShippingCost = async ( shippingCost: string, distance: number ) => {
    const data = await CartAPI.updateShippingCost( shippingCost, distance, state.id );
    if(data && data.success){
      dispatch({
        type: "[Cart] - change shipping cost",
        payload: shippingCost
      })
      toast.success(data.message);
    }else{
      toast.error(data?.message || "Ocurrio un error");
    }
  }

  const handleChangeShippingCostMemory = (shippingCost: string) => {
    const cart = JSON.parse( Cookies.get("cart") || "null") as CartDTO;
    if( cart ){
      dispatch({
        type: "[Cart] - change shipping cost",
        payload: shippingCost
      })
      const newTotal = getTotal(state.items, shippingCost);
      const newCart: CartDTO = {
        ...cart,
        shippingCost,
        tax: newTotal.tax.toFixed(2),
        total: newTotal.total
      }
      Cookies.set("cart", JSON.stringify(newCart));
    }
  }

  const handleChangeCart = ( cart: CartDTO) => {
    dispatch({
      type: "[Cart] - load cart",
      payload: cart
    })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      onAddItem: handleAddItem,
      onAddMemoryItem: handleAddMemoryItem,
      onRemoveItem: handleRemoveItem,
      onChangeShippingCost: handleChangeShippingCost,
      onRemoveMemoryItem: handleRemoveMemoryItem,
      onChangeShippingCostMemory: handleChangeShippingCostMemory,
      onClear: handleClear,
      onChangeCart: handleChangeCart
    }} >
      { children }
    </CartContext.Provider>
  )
}