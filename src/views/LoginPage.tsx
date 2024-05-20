import BasicForm from '../components/BasicForm';
import { InputType, ButtonType } from '../scripts/constants/enums';
import { emailProps, passwordProps } from '../scripts/constants/inputProps';
// import { validate } from '../scripts/helpers/validation';
import Link from '../components/Link';
import { useAppDispatch } from '../scripts/hooks/storeHooks';
import { login } from '../store/actions/authenticationActions';
import { FormEvent } from 'react';
import { LoginFormElements } from '../scripts/constants/types';
const rememberProps = {
  type: InputType.checkbox,
  label: 'Remember me',
  name: 'remember',
};

const buttonProps = {
  type: ButtonType.submit,
  text: 'Login',
};

const loginFields = [
  {
    props: emailProps,
    name: 'email',
    default: '',
  },
  {
    props: passwordProps,
    name: 'password',
    default: '',
  },
  {
    props: rememberProps,
    name: 'remember',
    default: '',
  },
];

export default function Login() {
  const dispatch = useAppDispatch();
  const onSubmit = async (e: FormEvent<LoginFormElements>) => {
    const target = e.currentTarget;
    const elements = target.elements;
    const email = elements.email.value;
    const password = elements.password.value;
    return await dispatch(login(email, password));
  };
  return (
    <div>
      <BasicForm
        title="Login"
        fields={loginFields}
        submitButton={buttonProps}
        // validate={validate}
        onSubmit={onSubmit}
      />
      <Link page="/register">Register</Link>
    </div>
  );
}
