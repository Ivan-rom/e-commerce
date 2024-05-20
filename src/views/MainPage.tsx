import Header from '../components/Header';
import About from '../pages/about/About';
import { PageNames } from '../scripts/constants/enums';

export default function Main() {
  return (
    <>
      <Header navPages={[PageNames.login, PageNames.register]} />
      <About />
    </>
  );
}
