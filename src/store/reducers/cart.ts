import { CartState } from '../../scripts/constants/apInterfaces';
import { CartActions } from '../../scripts/constants/enums';

const initialState: CartState | null = null;

export default function (
  state = initialState,
  action: { type: CartActions; payload: { cart: CartState } },
) {
  const { type, payload } = action;
  switch (type) {
    case CartActions.GET_CART:
      localStorage.setItem('e-com-cart-id', payload.cart.id);
      return {
        ...state,
        ...payload.cart,
      };
    case CartActions.CREATE_CART:
      localStorage.setItem('e-com-cart-id', payload.cart.id);
      return {
        ...state,
        ...payload.cart,
      };
    case CartActions.ACTIVATE_DISCOUNT:
      return {
        ...state,
        ...payload.cart,
      };
    case CartActions.ADD_TO_CART:
      return {
        ...state,
        ...payload.cart,
      };
    case CartActions.CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        ...payload.cart,
      };
    case CartActions.DELETE_ITEM:
      return {
        ...state,
        ...payload.cart,
      };
    case CartActions.CLEAR_CART:
      return {
        ...state,
        ...payload.cart,
      };
    default:
      return state;
  }
}
