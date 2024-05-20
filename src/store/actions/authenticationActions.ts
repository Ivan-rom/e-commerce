import { AuthActions } from '../../scripts/constants/enums';

import { authenticateCustomer } from '../../scripts/api/client';
// import { Customer, AuthData } from '../constants/apInterfaces';
// export const register = (username, email, password) => (dispatch) => {
//   return AuthService.register(username, email, password).then(
//     (response) => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: response.data.message,
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: REGISTER_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     },
//   );
// };

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
