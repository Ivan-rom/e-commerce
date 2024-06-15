import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowRightStartOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  UserCircleIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';
import Button from './Button';
import { useAppDispatch } from '../scripts/hooks/storeHooks';
import { logout } from '../store/actions/authenticationActions';
import { Auth } from '../scripts/constants/apInterfaces';

export default function Header() {
  const state = useSelector((state: Auth) => state.auth);
  const dispatch = useAppDispatch();
  const onSubmit = () => dispatch(logout());
  return (
    <header>
      <nav className="nav text-base inline-flex justify-between w-full items-center gap-2">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? 'fw-200' : isActive ? 'fw-700 ' : 'fw-200'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/basket"
          className={({ isActive, isPending }) =>
            isPending
              ? 'p-2 rounded ml-auto hover:bg-sky-200 transition-colors'
              : isActive
                ? 'bg-sky-900 text-white p-2 rounded ml-auto transition-colors'
                : 'p-2 rounded ml-auto hover:bg-sky-200 transition-colors'
          }
        >
          <ShoppingCartIcon className="size-5" />
        </NavLink>
        <div className="inline-flex items-center gap-2">
          {!state.isLoggedIn && (
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

          {!state.isLoggedIn && (
            <NavLink
              to="/register"
              className={({ isActive, isPending }) =>
                isPending ? 'button' : isActive ? 'button button-hover' : 'button'
              }
            >
              Register
            </NavLink>
          )}

          {state.isLoggedIn && (
            <>
              <div className="button-collapsed">
                <div className="button-collapsed__wrapper">
                  <div className="font-semibold text-xs">{state.user.email}</div>
                  <UserCircleIcon className="h-8 cursor-pointer" />
                  <div className="user-menu">
                    <div className="font-bold text-base py-2">
                      {state.user.firstName as string} {state.user.lastName as string}
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
