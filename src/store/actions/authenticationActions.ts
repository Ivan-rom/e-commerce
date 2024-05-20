/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthActions } from '../../scripts/constants/enums';

import { authenticateCustomer, createCustomer } from '../../scripts/api/client';
// import { Customer, AuthData } from '../constants/apInterfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const register =
  (
    firstName: any,
    lastName: any,
    email: any,
    password: any,
    dateOfBirth: any,
    // street: any,
    // city: any,
  ) =>
  (dispatch: (arg0: { type: any; payload?: any }) => void) =>
    createCustomer({ firstName, lastName, email, password, dateOfBirth }).then(
      (data) => {
        dispatch({
          type: AuthActions.REGISTER_SUCCESS,
        });
        console.log(data);
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: AuthActions.REGISTER_FAIL,
        });

        return Promise.reject(message);
      },
    );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = (email: string, password: string) => (dispatch: any) =>
  authenticateCustomer({ email: email, password: password }).then(
    (data) => {
      dispatch({
        type: AuthActions.LOGIN_SUCCESS,
        payload: { user: data },
      });
      localStorage.setItem(
        'e-com-user',
        JSON.stringify({ email: email, password: password, user: data.body.customer }),
      );
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: AuthActions.LOGIN_FAIL,
      });

      dispatch({
        type: AuthActions.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(message);
    },
  );

export const logout = () => (dispatch: (arg0: { type: AuthActions }) => void) => {
  dispatch({
    type: AuthActions.LOGOUT,
  });
  localStorage.clear();
};
