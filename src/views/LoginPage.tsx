/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const validateValues = (inputValues: HTMLFormElement): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  const elements: { [key: string]: any } = inputValues.elements;
  if (elements.email.value.length < 15) {
    errors.email = 'Email is too short';
  }

  if (!elements.email.value.includes('@')) {
    errors.email = errors.email.concat('\n@ symbol required');
  }
  if (elements.password.value.length < 8) {
    errors.password = 'Password is too short';
  }
  return errors;
};

export default function Login() {
  return (
    <div>
      <BasicForm
        title="Login"
        fields={loginFields}
        submitButton={buttonProps}
        validate={validateValues}
      />
      <Button {...registerProps} />
    </div>
  );
}
