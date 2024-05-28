// import Header from '../components/Header';
import { MotionConfig, motion } from 'framer-motion';
import About from '../pages/about/About';
// import { PageNames } from '../scripts/constants/enums';

export default function Main() {
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* <Header navPages={[PageNames.login, PageNames.register]} /> */}
        <About />
      </motion.div>
    </MotionConfig>
  );
}
