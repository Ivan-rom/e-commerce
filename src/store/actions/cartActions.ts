import { CartActions } from '../../scripts/constants/enums';
import { AppDispatch } from '../store';
import {
  activateCode,
  changeItemInCartQuantity,
  createCart,
  getAnonymousCart,
  getCart,
  getCartById,
  removeFromCart,
} from '../../scripts/api/client';
import { CartState } from '../../scripts/constants/apInterfaces';

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

export const getCartByIdAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await getCartById(id);
    dispatch({ type: CartActions.GET_CART, payload: { cart: res.body } });
    return await Promise.resolve('Cart got');
  } catch {
    const res = await createCart(id);
    dispatch({ type: CartActions.CREATE_CART, payload: { cart: res.body } });
    return Promise.resolve('Something went wrong');
  }
};

export const getAnonymousCartAction = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await getAnonymousCart(id);
    dispatch({ type: CartActions.GET_CART, payload: { cart: res.body } });
    return await Promise.resolve('Cart got');
  } catch {
    return Promise.resolve('Something went wrong');
  }
};

export const activateDiscountAction =
  (cart: CartState, code: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await activateCode(cart.id, cart.version, code);
      dispatch({
        type: CartActions.ACTIVATE_DISCOUNT,
        payload: { cart: res.body },
      });
      return await Promise.resolve('Code activated');
    } catch {
      return await Promise.reject("Couldn't activate discount :(");
    }
  };

export const changeItemQuantityAction =
  (cart: CartState, id: string, quantity: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await changeItemInCartQuantity(cart.id, cart.version, id, quantity);
      dispatch({
        type: CartActions.CHANGE_ITEM_QUANTITY,
        payload: { cart: res.body },
      });
      return await Promise.resolve('Quantity changed');
    } catch {
      return await Promise.reject('Something went wrong');
    }
  };

export const removeItemAction =
  (cart: CartState, id: string) =>
  async (dispatch: AppDispatch): Promise<[string, CartState]> => {
    try {
      const res = await removeFromCart(cart.id, cart.version, id);
      dispatch({
        type: CartActions.DELETE_ITEM,
        payload: { cart: res.body },
      });
      return await Promise.resolve(['Item deleted', res.body]);
    } catch {
      return await Promise.reject(['Something went wrong', cart]);
    }
  };
