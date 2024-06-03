import { updateInfo, changePassword, getUserInfo } from '../../scripts/api/client';
import { Customer } from '../../scripts/constants/apInterfaces';
import { AuthActions } from '../../scripts/constants/enums';
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
export const updateCustomer =
  (id: string, version: number, actions: Customer) => (dispatch: AppDispatch) =>
    updateInfo(id, version, actions).then(
      (data) => {
        dispatch({
          type: AuthActions.UPDATE_SUCCESS,
          payload: { user: data.body },
        });
        console.log(data);
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
        console.log(data);
        return Promise.resolve('Success!');
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(error);
        dispatch({
          type: AuthActions.PASS_FAIL,
        });

        return Promise.reject(message);
      },
    );
