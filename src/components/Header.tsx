import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowRightStartOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import Button from './Button';
import { useAppDispatch } from '../scripts/hooks/storeHooks';
import { logout } from '../store/actions/authenticationActions';
import { Auth } from '../scripts/constants/apInterfaces';

export default function Header() {
  const state = useSelector((state: Auth) => state);
  const dispatch = useAppDispatch();
  const onSubmit = () => dispatch(logout());
  console.log(state);
  return (
    <header>
      <nav className="nav text-base inline-flex justify-between w-full items-center">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? 'fw-200' : isActive ? 'fw-700 ' : 'fw-200'
          }
        >
          Home
        </NavLink>
        <div className="inline-flex items-center gap-2">
          {!state.auth.isLoggedIn && (
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isPending ? 'button' : isActive ? 'button button-hover' : 'button'
              }
            >
              <span>Login</span>
              <ArrowRightStartOnRectangleIcon className="h-4" />
            </NavLink>
          )}

          {!state.auth.isLoggedIn && (
            <NavLink
              to="/register"
              className={({ isActive, isPending }) =>
                isPending ? 'button' : isActive ? 'button button-hover' : 'button'
              }
            >
              Register
            </NavLink>
          )}

          {state.auth.isLoggedIn && (
            <>
              <div className="button-collapsed">
                <div className="button-collapsed__wrapper">
                  <div className="font-semibold text-xs">{state.auth.user.email}</div>
                  <UserCircleIcon className="h-8 cursor-pointer" />
                  <div className="user-menu">
                    <div className="font-bold text-base py-2">
                      {state.auth.user.firstName} {state.auth.user.lastName}
                    </div>
                    <ul>
                      <li>
                        <NavLink to="/profile">Profile</NavLink>
                      </li>
                      <li>
                        <div className="inline-flex gap-2  items-center">
                          <Button
                            text="Logout"
                            class="inline-flex align-middle gap-1"
                            onClick={onSubmit}
                          >
                            <ArrowLeftStartOnRectangleIcon className="h-4" />
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
