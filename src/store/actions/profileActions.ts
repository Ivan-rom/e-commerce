import { updateInfo } from '../../scripts/api/client';
import { Customer } from '../../scripts/constants/apInterfaces';
import { AuthActions } from '../../scripts/constants/enums';
import { AppDispatch } from '../store';
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
        console.log(error);
        dispatch({
          type: AuthActions.REGISTER_FAIL,
        });

        return Promise.reject(message);
      },
    );
