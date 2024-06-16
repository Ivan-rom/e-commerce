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
      return {
        ...state,
        ...payload.cart,
      };
    case CartActions.CREATE_CART:
      return {
        ...state,
        ...payload.cart,
      };
    default:
      return state;
  }
}
