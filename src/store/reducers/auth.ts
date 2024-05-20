import { AuthActions } from '../../scripts/constants/enums';

const user = JSON.parse(<string>localStorage.getItem('e-com-user'));

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (state = initialState, action: { type: AuthActions; payload: any }) {
  const { type, payload } = action;
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
    default:
      return state;
  }
}
