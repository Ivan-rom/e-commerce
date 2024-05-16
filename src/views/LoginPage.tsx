import BasicForm from '../components/BasicForm';
import { InputType, ButtonType } from '../constants/enums';
import { emailProps, passwordProps } from '../constants/inputProps';
import { validate } from '../scripts/helpers/validation';
import Link from '../components/Link';
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
  return (
    <div>
      <BasicForm
        title="Login"
        fields={loginFields}
        submitButton={buttonProps}
        validate={validate}
      />
      <Link page="/register">Register</Link>
    </div>
  );
}
