import InputType from './inputTypes';

const emailProps = {
  type: InputType.email,
  label: 'E-mail',
  name: 'email',
  placeholder: 'yourmail@example.com',
};

const passwordProps = {
  type: InputType.password,
  label: 'Password',
  name: 'password',
  placeholder: 'put your password',
};

export { emailProps, passwordProps };
