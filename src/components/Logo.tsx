import { NavLink } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../assets/svg/logo.svg';

interface Props {
  className: string;
}
export default function Logo({ className }: Props) {
  return (
    <NavLink to="/main">
      <LogoIcon className={className} />
    </NavLink>
  );
}
