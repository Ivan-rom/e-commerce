import { Cart } from '../../scripts/constants/apInterfaces';
import { CartActions } from '../../scripts/constants/enums';

const initialState: Cart | null = null;

export default function (state = initialState, action: { type: CartActions; payload: Cart }) {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case CartActions.GET_CART:
      return {
        ...state,
        cart: { ...payload.cart },
      };
    case CartActions.CREATE_CART:
      return {
        ...state,
        cart: { ...payload.cart },
      };
    case CartActions.ACTIVATE_DISCOUNT:
      return {
        ...state,
        cart: { ...payload.cart },
      };
    case CartActions.CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        cart: { ...payload.cart },
      };
    case CartActions.DELETE_ITEM:
      return {
        ...state,
        cart: { ...payload.cart },
      };
    case CartActions.CLEAR_CART:
      return {
        ...state,
        cart: { ...payload.cart },
      };
    default:
      return state;
  }
}
