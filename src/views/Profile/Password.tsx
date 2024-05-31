import { MotionConfig, motion } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
// import { ButtonType } from '../../scripts/constants/enums';
// import Button from '../../components/Button';
export default function Password() {
  //   const dispatch = useAppDispatch();
  //   const user = useSelector((state: Auth) => state.auth.user);
  //   const [errors, setErrors] = useState<{ [key: string]: string }>(
  //     Object.keys(formConfig).reduce((acc: Record<string, string>, item: string) => {
  //       acc[item] = '';
  //       return acc;
  //     }, {}),
  //   );
  //   const [disabled, setDisabled] = useState(true);
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <h1 className="font-bold text-3xl">Password</h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}></motion.div>
    </MotionConfig>
  );
}
