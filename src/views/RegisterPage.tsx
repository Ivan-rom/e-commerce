import BasicForm from '../components/BasicForm';
import { ButtonType, InputType } from '../constants/enums';
import Link from '../components/Link';
import { emailProps, passwordProps } from '../constants/inputProps';
import { validate } from '../scripts/helpers/validation';
const rememberProps = {
  type: InputType.checkbox,
  label: 'Remember me',
  name: 'remember',
};

export const repeatProps = {
  type: InputType.text,
  label: 'Password',
  name: 'repeated_password',
  placeholder: 'repeat password',
  other: {
    'aria-label': 'Password repeat field',
    required: true,
  },
};

const buttonProps = {
  type: ButtonType.submit,
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
    props: repeatProps,
    name: 'repeatPassword',
    default: '',
  },
  {
    props: rememberProps,
    name: 'remember',
    default: '',
  },
];

export default function Register() {
  return (
    <div>
      <BasicForm
        title="Register"
        fields={loginFields}
        submitButton={buttonProps}
        validate={validate}
      />
      <Link page="/login">Login</Link>
    </div>
  );
}
