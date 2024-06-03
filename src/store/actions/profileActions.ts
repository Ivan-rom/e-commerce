import {
  updateInfo,
  changePassword,
  getUserInfo,
  createAddress,
  saveAsAddressType,
  saveAsBothAddressTypes,
} from '../../scripts/api/client';
import { Customer, userAddress } from '../../scripts/constants/apInterfaces';
import { AuthActions, addAddressType } from '../../scripts/constants/enums';
import { AppDispatch } from '../store';

export const getUser = (id: string) => (dispatch: AppDispatch) => {
  getUserInfo(id).then(
    (data) => {
      dispatch({
        type: AuthActions.GET_USER,
        payload: { user: data.body },
      });
      return Promise.resolve('Success!');
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject(message);
    },
  );
};

export const addAddress =
  (id: string, version: number, address: userAddress, addressType: string) =>
  (dispatch: AppDispatch) =>
    createAddress(id, version, address).then(
      async (data) => {
        dispatch({
          type: AuthActions.ADD_ADDRESS,
          payload: { user: data.body },
        });
        console.log(data.body);
        const addressId = data.body.addresses.at(-1)?.id;
        const newVersion = data.body.version;
        const type =
          addressType.toLowerCase() === 'billing'
            ? addAddressType.BILLING
            : addressType.toLowerCase() === 'shipping'
              ? addAddressType.SHIPPING
              : 'BOTH';
        if (type === addAddressType.BILLING || type === addAddressType.SHIPPING) {
          const data = await saveAsAddressType(id, newVersion, addressId as string, type);
          dispatch({
            type: AuthActions.ADD_ADDRESS,
            payload: { user: data.body },
          });
          return Promise.resolve('Success!');
        } else {
          const data = await saveAsBothAddressTypes(id, newVersion, addressId as string);
          dispatch({
            type: AuthActions.ADD_ADDRESS,
            payload: { user: data.body },
          });
          return Promise.resolve('Success!');
        }
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return message;
      },
    );
export const updateCustomer =
  (id: string, version: number, actions: Customer) => (dispatch: AppDispatch) =>
    updateInfo(id, version, actions).then(
      (data) => {
        dispatch({
          type: AuthActions.UPDATE_SUCCESS,
          payload: { user: data.body },
        });
        return Promise.resolve('Success!');
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: AuthActions.UPDATE_FAIL,
        });

        return Promise.reject(message);
      },
    );

export const updatePassword =
  (id: string, version: number, oldPassword: string, newPassword: string) =>
  (dispatch: AppDispatch) =>
    changePassword(id, version, oldPassword, newPassword).then(
      (data) => {
        dispatch({
          type: AuthActions.PASS_SUCCESS,
          payload: { user: data.body },
        });
        return Promise.resolve('Success!');
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: AuthActions.PASS_FAIL,
        });

        return Promise.reject(message);
      },
    );
