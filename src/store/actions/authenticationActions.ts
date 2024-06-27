import { AuthActions } from '../../scripts/constants/enums';
import { AppDispatch } from '../store';
import { authenticateCustomer, createCustomer } from '../../scripts/api/client';
import { Customer } from '../../scripts/constants/apInterfaces';

export const register =
  ({ firstName, lastName, email, address, password, dateOfBirth }: Customer) =>
  (dispatch: AppDispatch) =>
    createCustomer({
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      password: password,
      dateOfBirth: dateOfBirth,
    }).then(
      (res) => {
        dispatch({
          type: AuthActions.REGISTER_SUCCESS,
          payload: { user: res.body.customer },
        });
        return Promise.resolve('Account successfully created!');
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

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  const customer = authenticateCustomer({ email: email, password: password });
  return customer.execute().then(
    (data) => {
      dispatch({
        type: AuthActions.LOGIN_SUCCESS,
        payload: { user: data.body.customer },
      });
      localStorage.setItem(
        'e-com-user',
        JSON.stringify({ email: email, password: password, user: data.body.customer }),
      );
      return Promise.resolve('Success!');
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
};

export const logout = () => (dispatch: (arg0: { type: AuthActions }) => void) => {
  dispatch({
    type: AuthActions.LOGOUT,
  });
  localStorage.clear();
};
