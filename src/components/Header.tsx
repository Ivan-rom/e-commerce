import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? 'tc-accent fw-200' : isActive ? 'fw-700 tc-accent' : 'tc-accent fw-200'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? 'tc-accent fw-200' : isActive ? 'fw-700 tc-accent' : 'tc-accent fw-200'
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive, isPending }) =>
            isPending ? 'tc-accent fw-200' : isActive ? 'fw-700 tc-accent' : 'tc-accent fw-200'
          }
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
}
