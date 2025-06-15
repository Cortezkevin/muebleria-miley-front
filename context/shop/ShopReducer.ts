import { CategoryDTO, ProductDTO } from '@/types';
import { ShopState } from './'

type ShopAction = 
{ 
  type: '[Shop] - Loading Products', 
  payload: boolean 
} | { 
  type: '[Shop] - Loading Categories', 
  payload: boolean 
} | { 
  type: '[Shop] - Products Loaded', 
  payload: ProductDTO[] 
} | { 
  type: '[Shop] - Categories Loaded', 
  payload: CategoryDTO[] 
};

export const ShopReducer = ( state: ShopState, action: ShopAction ): ShopState => {
  switch( action.type ) {
    case '[Shop] - Loading Products':
      return {
        ...state,
        products: {
          ...state.products,
          loading: action.payload
        }
      };
    case '[Shop] - Products Loaded':
      return {
        ...state,
        products: {
          loading: false,
          data: action.payload
        }
      };
    case '[Shop] - Loading Categories':
      return {
        ...state,
        categories: {
          ...state.categories,
          loading: action.payload
        }
      };
    case '[Shop] - Categories Loaded':
      return {
        ...state,
        categories: {
          loading: false,
          data: action.payload
        }
      };
    default:
      return state;
  }
}