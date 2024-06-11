// import Header from '../components/Header';
import { MotionConfig, motion } from 'framer-motion';
// import { PageNames } from '../scripts/constants/enums';
import Catalog from '../components/Catalog';

export default function Main() {
  // temporary code to use product page

  return (
    <>
      <MotionConfig transition={{ duration: 1 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Catalog />
          {/* <Header navPages={[PageNames.login, PageNames.register]} /> */}
        </motion.div>
      </MotionConfig>
    </>
  );
}
