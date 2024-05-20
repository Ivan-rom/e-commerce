import BasicForm from '../components/BasicForm';
import { InputType, ButtonType, PageNames } from '../scripts/constants/enums';
import { emailProps, passwordProps } from '../scripts/constants/inputProps';
import { validate } from '../scripts/helpers/validation';
import Link from '../components/Link';
import Header from '../components/Header';
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
    <>
      <Header navPages={[PageNames.main]} />
      <main>
        <BasicForm
          title="Login"
          fields={loginFields}
          submitButton={buttonProps}
          validate={validate}
        />
        <Link page="/register">Register</Link>
      </main>
    </>
  );
}
