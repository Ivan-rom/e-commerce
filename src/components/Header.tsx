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
  const state = useSelector((state: auth) => state.auth);
  const dispatch = useAppDispatch();
  const onSubmit = () => dispatch(logout());
  return (
    <header>
      <nav className="nav text-base inline-flex justify-between w-full">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? 'tc-accent fw-200' : isActive ? 'fw-700 tc-accent' : 'tc-accent fw-200'
          }
        >
          Home
        </NavLink>

        {!state.isLoggedIn && (
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending
                ? 'tc-accent fw-200 text-base max-h-4 flex'
                : isActive
                  ? 'fw-700 tc-accent text-base max-h-4 flex'
                  : 'tc-accent fw-200 text-base max-h-4 flex'
            }
          >
            <span>Login</span>
            <ArrowRightStartOnRectangleIcon className="max-h-4" />
          </NavLink>
        )}

        {!state.isLoggedIn && (
          <NavLink
            to="/register"
            className={({ isActive, isPending }) =>
              isPending ? 'tc-accent fw-200' : isActive ? 'fw-700 tc-accent' : 'tc-accent fw-200'
            }
          >
            Register
          </NavLink>
        )}

        {state.isLoggedIn && (
          <div className="inline-flex gap-2">
            {state.isLoggedIn && <p> You&apos;re exploring as {state.user.email} </p>}
            <span> Not you? </span>
            <Button text="Logout" class="flex" onClick={onSubmit}>
              <ArrowLeftStartOnRectangleIcon className="h-4" />
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
