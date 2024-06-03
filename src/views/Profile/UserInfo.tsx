import { PencilIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { Auth, Customer } from '../../scripts/constants/apInterfaces';
import Input from '../../components/Input';
import { FormEvent, useState } from 'react';
import { ButtonType } from '../../scripts/constants/enums';
import { infoFormConfig } from './config';
import Button from '../../components/Button';
import { validate } from '../../scripts/helpers/validation';
import { validateFields } from '../../scripts/helpers/fieldHandler';
import { useAppDispatch } from '../../scripts/hooks/storeHooks';
import { updateCustomer } from '../../store/actions/profileActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, MotionConfig } from 'framer-motion';
export default function UserInfo() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: Auth) => state.auth.user);
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    Object.keys(infoFormConfig).reduce((acc: Record<string, string>, item: string) => {
      acc[item] = '';
      return acc;
    }, {}),
  );
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState(
    infoFormConfig.reduce(
      (acc: Record<string, { value: string | number | boolean; disabled: boolean }>, item) => {
        acc[item.name] = {
          value: user[item.name] as string | number | boolean,
          disabled: true,
        };
        return acc;
      },
      {},
    ),
  );

  const onChange = (e: FormEvent) => {
    e.preventDefault;
    setDisabled(false);
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const actions = Object.entries(values).reduce((acc: Customer, [key, item]) => {
      acc = {
        [key]: item.value as string,
        ...acc,
      };
      return acc;
    }, {} as Customer);
    dispatch(updateCustomer(user.id as string, user.version as number, actions))
      .then(() => {
        toast.success('Succesfully updated!', { position: 'bottom-center' });
        setDisabled(true);
      })
      .catch(() => toast.error('Failed to update. Try again later'));
  };
  const handleClick = (name: string) => {
    const obj = values[name];
    setValues({
      ...values,
      [name as string]: {
        value: obj.value,
        disabled: !obj.disabled,
      },
    });
  };
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-bold text-3xl">Profile</h1>
        <div className="profile">
          <form onSubmit={onSubmit}>
            {infoFormConfig.map((item, index) => {
              return (
                <div key={index}>
                  <Input
                    name={item.name}
                    label={item.label}
                    type={item.type}
                    inputClass="input input-editable"
                    value={values[item.name as keyof typeof values].value as string}
                    disabled={values[item.name as keyof typeof values].disabled}
                    onChange={onChange}
                  >
                    <PencilIcon
                      className="h-4"
                      name={item.name}
                      onClick={() => handleClick(item.name)}
                    />
                  </Input>
                  {errors[item.name] && <div className="error">{errors[item.name]}</div>}
                </div>
              );
            })}
            <Button
              type={ButtonType.submit}
              text="Save"
              class="button button-standart"
              disabled={disabled || Object.values(errors).join('').length > 0}
            ></Button>
            <ToastContainer position="bottom-center" theme="colored" autoClose={1000} />
          </form>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
