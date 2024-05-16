import BasicForm from '../components/BasicForm';
import { ButtonType, InputType } from '../constants/enums';
import Button from '../components/Button';
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
    minlength: '8',
    pattern: '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
    title:
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
  },
};

const buttonProps = {
  type: ButtonType.submit,
  text: 'Register',
};

const registerProps = {
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
        title="Login"
        fields={loginFields}
        submitButton={buttonProps}
        validate={validate}
      />
      <Button {...registerProps} />
    </div>
  );
}
