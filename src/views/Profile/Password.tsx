import { MotionConfig, motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from 'react-loader-spinner';
// import { login } from '../../store/actions/authenticationActions';
import { getUser } from '../../store/actions/profileActions';
// import { updatePassword } from '../../store/actions/profileActions';
import { useAppDispatch } from '../../scripts/hooks/storeHooks';
import { useSelector } from 'react-redux';
import { Auth } from '../../scripts/constants/apInterfaces';
import { passwordFormConfig } from './config';
import { FormEvent, useState } from 'react';
import Button from '../../components/Button';
import { ToastContainer } from 'react-toastify';
import { ButtonType } from '../../scripts/constants/enums';
import Input from '../../components/Input';
import { validate } from '../../scripts/helpers/validation';
import { validateFields } from '../../scripts/helpers/fieldHandler';
export default function Password() {
  const dispatch = useAppDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const user = useSelector((state: Auth) => state.auth.user);
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    Object.keys(passwordFormConfig).reduce((acc: Record<string, string>, item: string) => {
      acc[item] = '';
      return acc;
    }, {}),
  );
  const [values, setValues] = useState(
    passwordFormConfig.reduce(
      (acc: Record<string, { value: string | number | boolean; disabled: boolean }>, item) => {
        acc[item.name] = {
          value: user[item.name] as string | number | boolean,
          disabled: item.disabled,
        };
        return acc;
      },
      {},
    ),
  );
  const onSubmit = async (e: FormEvent) => {
    setIsVerified(true);
    e.preventDefault();
  };

  const onVerify = async (e: FormEvent) => {
    e.preventDefault;
    if (Object.values(errors).join('').length == 0) {
      const result = await dispatch(getUser());
      console.log(result);
    }
  };
  const onChange = async (e: FormEvent) => {
    e.preventDefault;
    const { name, value } = e.target as HTMLInputElement;
    validateFields(e, setErrors, errors, validate);
    setValues({
      ...values,
      [name]: {
        value: value,
        disabled: values[name].disabled,
      },
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
                  value={values[item.name as keyof typeof values].value as string}
                  disabled={!isVerified && item.name == 'newPassword'}
                  onChange={onChange}
                ></Input>
                {errors[item.name] && <div className="error">{errors[item.name]}</div>}
                <div>
                  {!isVerified && (
                    <Button
                      text="Verify"
                      onClick={onVerify}
                      class="confirm-password"
                      type={ButtonType.button}
                    ></Button>
                  )}
                  {!isVerified && (
                    <TailSpin
                      visible={true}
                      height="20"
                      width="20"
                      color="rgb(14 165 233)"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                </div>
              </div>
            );
          })}
          <Button
            type={ButtonType.submit}
            text="Save"
            class="button button-standart"
            disabled={isVerified}
          ></Button>
          <ToastContainer position="bottom-center" theme="colored" autoClose={1000} />
        </form>
      </motion.div>
    </MotionConfig>
  );
}
