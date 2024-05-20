import { InputType } from './enums';

export const emailProps = {
  type: InputType.text,
  label: 'E-mail',
  name: 'email',
  placeholder: 'yourmail@example.com',
  other: {
    'aria-label': 'Email field',
    required: true,
    autoComplete: 'email',
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
    autoComplete: 'current-password',
  },
};
