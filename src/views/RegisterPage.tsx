import BasicForm from '../components/BasicForm';
import { ButtonType, InputType } from '../scripts/constants/enums';
import Link from '../components/Link';
import { emailProps, passwordProps } from '../scripts/constants/inputProps';
import { validate } from '../scripts/helpers/validation';
// import { register } from '../store/actions/authenticationActions';
// import { useAppDispatch } from '../scripts/hooks/storeHooks';
// import { RegisterFormElements } from '../scripts/constants/types';
// import { FormEvent } from 'react';
// import { FormEvent } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

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

const firstName = {
  type: InputType.text,
  label: 'First name',
  name: 'firstName',
};
const lastName = {
  type: InputType.text,
  label: 'Last name',
  name: 'lastName',
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
    props: firstName,
    name: 'firstName',
    default: '',
  },
  {
    props: lastName,
    name: 'lastName',
    default: '',
  },
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

// const onSubmit = (e: FormEvent) => {
//   e.preventDefault();
//   const { email, password, dateOfBirth, street, city } = e.target as HTMLInputElement;
//   dispatchEvent()
// };

export default function Register() {
  // const dispatch = useAppDispatch();
  // const onSubmit = async (e: FormEvent<RegisterFormElements>) => {
  //   const target = e.currentTarget;

  //   const elements = target.elements;
  //   return await dispatch(
  //     register(
  //       elements.firstName.value,
  //       elements.lastName,
  //       elements.email.value,
  //       elements.password.value,
  //       elements.dateOfBirth.value,
  //     ),
  //   );
  // };
  return (
    <div>
      <BasicForm
        title="Register"
        fields={loginFields}
        submitButton={buttonProps}
        validate={validate}
        // onSubmit={onSubmit}
        // formType={RegisterFormElements}
      />
      <Link page="/login">Login</Link>
    </div>
  );
}
