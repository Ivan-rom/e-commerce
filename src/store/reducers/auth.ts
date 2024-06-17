import { AuthState } from '../../scripts/constants/apInterfaces';
import { AuthActions } from '../../scripts/constants/enums';

const user = JSON.parse(<string>localStorage.getItem('e-com-user'));

const initialState = user
  ? { isLoggedIn: true, ...user, anonymousId: null }
  : { isLoggedIn: false, user: null, anonymousId: Date.now().toString() };

export default function (
  state = initialState,
  action: { type: AuthActions; payload: { user: AuthState } },
) {
  const { type, payload } = action;

  switch (type) {
    case AuthActions.LOGIN_SUCCESS:
      localStorage.setItem('e-com-user', JSON.stringify({ ...state, ...payload.user }));
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case AuthActions.REGISTER_FAIL:
      localStorage.setItem('e-com-user', JSON.stringify({ ...state, ...payload.user }));
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case AuthActions.PASS_SUCCESS:
      localStorage.setItem('e-com-user', JSON.stringify({ ...state, ...payload.user }));
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case AuthActions.UPDATE_SUCCESS:
      localStorage.setItem('e-com-user', JSON.stringify({ ...state, ...payload.user }));
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case AuthActions.ADD_ADDRESS:
      localStorage.setItem('e-com-user', JSON.stringify({ ...state, ...payload.user }));
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };

    case AuthActions.REMOVE_ADDRESS:
      localStorage.setItem('e-com-user', JSON.stringify({ ...state, ...payload.user }));
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case AuthActions.SET_DEFAULT_ADDRESS:
      localStorage.setItem('e-com-user', JSON.stringify({ ...state, ...payload.user }));
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    default:
      return state;
  }
}
