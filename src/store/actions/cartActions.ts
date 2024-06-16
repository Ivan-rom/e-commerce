import { CartActions } from '../../scripts/constants/enums';
import { AppDispatch } from '../store';
import { createCart, getCart } from '../../scripts/api/client';

export const getCartAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await getCart(id);
    dispatch({ type: CartActions.GET_CART, payload: { cart: res.body } });
    return await Promise.resolve('Cart got');
  } catch {
    const res = await createCart(id);
    dispatch({ type: CartActions.CREATE_CART, payload: { cart: res.body } });
    return Promise.resolve('Cart created');
  }
};
