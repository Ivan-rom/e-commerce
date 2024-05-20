import BasicForm from '../components/BasicForm';
import { ButtonType, InputType, PageNames } from '../scripts/constants/enums';
import Link from '../components/Link';
import { emailProps, passwordProps } from '../scripts/constants/inputProps';
import { validate } from '../scripts/helpers/validation';
import Header from '../components/Header';
const rememberProps = {
  type: InputType.checkbox,
  label: 'Remember me',
  name: 'remember',
};

const street = {
  type: InputType.text,
  label: 'Street',
  name: 'street',
};

const city = {
  type: InputType.text,
  label: 'City',
  name: 'city',
};

const birthDateProps = {
  type: InputType.date,
  label: 'Date of birth',
  name: 'birthday',
  other: {
    'aria-label': 'Date of birth field',
    required: true,
    min: '1924-01-01',
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
    props: birthDateProps,
    name: 'birthday',
    default: '',
  },
  {
    props: street,
    name: 'street',
    default: '',
  },
  {
    props: city,
    name: 'city',
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
    <>
      <Header navPages={[PageNames.main]} />
      <main>
        <BasicForm
          title="Register"
          fields={loginFields}
          submitButton={buttonProps}
          validate={validate}
        />
        <Link page="/login">Login</Link>
      </main>
    </>
  );
}
