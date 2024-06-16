import { CartActions } from '../../scripts/constants/enums';
import { AppDispatch } from '../store';
import {
  activateCode,
  changeItemInCartQuantity,
  createCart,
  getCart,
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

export const removeItemAction = (cart: CartState, id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await removeFromCart(cart.id, cart.version, id);
    dispatch({
      type: CartActions.DELETE_ITEM,
      payload: { cart: res.body },
    });
    return await Promise.resolve('Item deleted');
  } catch {
    return await Promise.reject('Something went wrong');
  }
};

export const clearCartAction = async (cart: CartState) => async (dispatch: AppDispatch) => {
  try {
    const currentCart = { ...cart };

    while (currentCart.lineItems.length > 0) {
      const res = await removeFromCart(
        currentCart.id,
        currentCart.version,
        currentCart.lineItems[0].id,
      );
      currentCart.lineItems.shift();
      currentCart.version = res.body.version;
    }

    dispatch({
      type: CartActions.CLEAR_CART,
      payload: currentCart,
    });

    return 'Cart cleared';
  } catch {
    return Promise.reject('Something went wrong');
  }
};
