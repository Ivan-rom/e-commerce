import { NavLink } from 'react-router-dom';
import { pageInfo } from '../scripts/constants/types';

interface Props {
  navLinks: Array<pageInfo>;
  className: string;
}

export default function NavigationField({ navLinks, className }: Props) {
  return (
    <nav className={className}>
      {navLinks.map((link, idx) => (
        <NavLink key={idx} to={link.to} className={link.className}>
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
}
