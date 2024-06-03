import { MotionConfig, motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { updatePassword } from '../../store/actions/profileActions';
import { useAppDispatch } from '../../scripts/hooks/storeHooks';
import { useSelector } from 'react-redux';

import { Auth } from '../../scripts/constants/apInterfaces';
import { passwordFormConfig } from './config';
import { FormEvent, useState } from 'react';
import Button from '../../components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { ButtonType } from '../../scripts/constants/enums';
import Input from '../../components/Input';
import { validate } from '../../scripts/helpers/validation';
import { validateFields } from '../../scripts/helpers/fieldHandler';
export default function Password() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: Auth) => state.auth.user);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    currentPassword: '',
    newPassword: '',
  });
  const [values, setValues] = useState({ currentPassword: '', newPassword: '' });
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      updatePassword(
        user.id as string,
        user.version as number,
        values.currentPassword,
        values.newPassword,
      ),
    )
      .then(() => {
        toast.success('Succesfully updated!', { position: 'bottom-center' });
      })
      .catch((err) => {
        toast.error(err, { position: 'bottom-center' });
      });
  };

  const onChange = (e: FormEvent) => {
    e.preventDefault;
    const { name, value } = e.target as HTMLInputElement;
    validateFields(e, setErrors, errors, validate);
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-bold text-3xl">Password</h1>
        <form onSubmit={onSubmit}>
          {passwordFormConfig.map((item, index) => {
            return (
              <div key={index}>
                <Input
                  name={item.name}
                  label={item.label}
                  type={item.type}
                  inputClass="input"
                  value={values[item.name as keyof typeof values] as string}
                  onChange={onChange}
                ></Input>
                {errors[item.name] && <div className="error">{errors[item.name]}</div>}
              </div>
            );
          })}
          <Button
            type={ButtonType.submit}
            text="Save"
            class="button button-standart"
            disabled={
              Object.values(errors).join('').length > 0 ||
              Object.values(values).some((val) => !val.length)
            }
          ></Button>
        </form>
        <ToastContainer position="bottom-center" theme="colored" autoClose={2000} />
      </motion.div>
    </MotionConfig>
  );
}
