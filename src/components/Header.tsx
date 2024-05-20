import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowRightStartOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/solid';
import Button from './Button';
import { useAppDispatch } from '../scripts/hooks/storeHooks';
import { logout } from '../store/actions/authenticationActions';
interface auth {
  auth: props;
}

interface props {
  isLoggedIn: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function Header() {
  const state = useSelector((state: auth) => state);
  const dispatch = useAppDispatch();
  const onSubmit = () => dispatch(logout());
  return (
    <header>
      <nav className="nav text-base inline-flex justify-between w-full justify-center items-center">
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
                isPending
                  ? 'fw-200 gap-1 flex flex p-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center'
                  : isActive
                    ? 'fw-700 gap-1 flex flex p-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center cursor-default'
                    : 'fw-200 gap-1 flex flex p-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center'
              }
            >
              <span>Login</span>
              <ArrowRightStartOnRectangleIcon className="max-h-4" />
            </NavLink>
          )}

          {!state.auth.isLoggedIn && (
            <NavLink
              to="/register"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'fw-200 gap-1 flex flex p-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center'
                  : isActive
                    ? 'fw-700 gap-1 flex flex p-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center cursor-default'
                    : 'fw-200 gap-1 flex flex p-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center'
              }
            >
              Register
            </NavLink>
          )}

          {state.auth.isLoggedIn && (
            <div className="inline-flex gap-2  items-center">
              {state.auth.user.email && state.auth.isLoggedIn && (
                <p>
                  You&apos;re exploring as {state.auth.user.email} <span> Not you? </span>
                </p>
              )}

              <Button
                text="Logout"
                class="gap-1 flex flex p-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center"
                onClick={onSubmit}
              >
                <ArrowLeftStartOnRectangleIcon className="h-4" />
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
