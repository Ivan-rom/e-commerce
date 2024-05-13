import InputType from './inputTypes';

const emailProps = {
  type: InputType.email,
  label: 'E-mail',
  name: 'email',
  placeholder: 'yourmail@example.com',
  other: {
    'aria-label': 'Email field',
  },
};

const passwordProps = {
  type: InputType.password,
  label: 'Password',
  name: 'password',
  placeholder: 'put your password',
  other: {
    'aria-label': 'Password field',
  },
};

export { emailProps, passwordProps };
