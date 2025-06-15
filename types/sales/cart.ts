export type MemoryCartDTO = {
    itemList: MemoryItemDTO[];
    shippingCost: string;
}

export type MemoryItemDTO = {
    productId: string;
    amount: number;
}

export type CartItemDTO = {
  id: string;
  product_id: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  price: string;
  amount: number;
  total: string;
  image: string;
}

export type CartDTO = {
  id: string;
  cartItems: CartItemDTO[];
  tax: string;
  discount: string;
  subtotal: string;
  distance: number;
  shippingCost: string;
  total: string;
  user_id: string;
}

export type AddItem = {
  cart_id: string;
  product_id: string;
  amount: number;
}

export type RemoveItem = {
  cart_id: string;
  item_id: string;
  removeAll: boolean;
  amount: number;
}

export type MemoryCart = {
  itemList: MemoryItem[];
  shippingCost: string;
}

export type MemoryItem = {
  productId: string;
  amount: number;
}