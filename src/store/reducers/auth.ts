import { AuthActions } from '../../scripts/constants/enums';

const user = JSON.parse(<string>localStorage.getItem('e-com-user'));

const initialState = user ? { isLoggedIn: true, ...user } : { isLoggedIn: false, user: null };

export default function (
  state = initialState,
  action: { type: AuthActions; payload: { user: object } },
) {
  const { type, payload } = action;
  localStorage.setItem('e-com-user', JSON.stringify({ ...state, ...payload }));
  switch (type) {
    // case REGISTER_SUCCESS:
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //   };
    // case REGISTER_FAIL:
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //   };
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case AuthActions.PASS_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case AuthActions.UPDATE_SUCCESS:
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
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };

    case AuthActions.REMOVE_ADDRESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case AuthActions.SET_DEFAULT_ADDRESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    default:
      return state;
  }
}
