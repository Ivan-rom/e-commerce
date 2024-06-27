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
import { Auth, CartState } from '../scripts/constants/apInterfaces';

export default function Header() {
  const stateAuth = useSelector((state: Auth) => state.auth);
  const stateCart = useSelector((state: { cart: CartState }) => state.cart);
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
        {stateCart && (
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
            <div className="relative">
              {stateCart.lineItems.length !== 0 && (
                <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 size-4 flex items-center justify-center fs-s">
                  {stateCart.lineItems.length}
                </div>
              )}
              <ShoppingCartIcon className="size-5" />
            </div>
          </NavLink>
        )}
        <div className="inline-flex items-center gap-2">
          {!stateAuth.isLoggedIn && (
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

          {!stateAuth.isLoggedIn && (
            <NavLink
              to="/register"
              className={({ isActive, isPending }) =>
                isPending ? 'button' : isActive ? 'button button-hover' : 'button'
              }
            >
              Register
            </NavLink>
          )}

          {stateAuth.isLoggedIn && (
            <>
              <div className="button-collapsed">
                <div className="button-collapsed__wrapper">
                  <div className="font-semibold text-xs">{stateAuth.user.email}</div>
                  <UserCircleIcon className="h-8 cursor-pointer" />
                  <div className="user-menu">
                    <div className="font-bold text-base py-2">
                      {stateAuth.user.firstName as string} {stateAuth.user.lastName as string}
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
