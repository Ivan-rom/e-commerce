import Logo from './Logo';
import NavigationField from './NavigationField';
import { PageNames } from '../scripts/constants/enums';
import { pageInfo } from '../scripts/constants/types';

const pageDescription: Array<pageInfo> = [
  {
    to: '/main',
    name: PageNames.main,
    text: 'Home',
    className:
      'flex px-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center',
  },
  {
    to: '/login',
    name: PageNames.login,
    text: 'Log in',
    className: 'flex px-2 rounded-2xl place-items-center',
  },
  {
    to: '/register',
    name: PageNames.register,
    text: 'Register',
    className:
      'flex px-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center',
  },
];

const cssClasses: { [key: string]: string } = {
  header: 'flex my-2.5 w-screen',
  nav: 'flex gap-5 ml-auto mr-5',
  logoIcon: 'size-10 ml-5',
};

interface Props {
  navPages: PageNames[];
}

export default function Header({ navPages }: Props) {
  return (
    <header className={cssClasses.header}>
      <Logo className={cssClasses.logoIcon} />
      <NavigationField
        navLinks={pageDescription.filter((item) => navPages.includes(item.name))}
        className={cssClasses.nav}
      />
    </header>
  );
}
