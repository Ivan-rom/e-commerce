import { InputType } from './enums';

export const emailProps = {
  type: InputType.email,
  label: 'E-mail',
  name: 'email',
  placeholder: 'yourmail@example.com',
  other: {
    'aria-label': 'Email field',
    required: true,
  },
};

export const passwordProps = {
  type: InputType.password,
  label: 'Password',
  name: 'password',
  placeholder: 'put your password',
  other: {
    'aria-label': 'Password field',
    required: true,
    minlength: '8',
    pattern: '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
    title:
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
  },
};
