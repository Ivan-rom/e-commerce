import BasicForm from '../components/BasicForm';
import { InputType, ButtonType } from '../constants/enums';
import Button from '../components/Button';
import { emailProps, passwordProps } from '../constants/inputProps';

const rememberProps = {
  type: InputType.checkbox,
  label: 'Remember me',
  name: 'remember',
};

const buttonProps = {
  type: ButtonType.submit,
  text: 'Login',
};

const registerProps = {
  text: 'Register',
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
  return (
    <div>
      <BasicForm title="Login" fields={loginFields} submitButton={buttonProps} />
      <Button {...registerProps} />
    </div>
  );
}
