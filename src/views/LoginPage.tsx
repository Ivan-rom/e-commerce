import Input from '../components/Input';
import InputType from '../constants/inputTypes';
import ButtonType from '../constants/buttonTypes';
import Button from '../components/Button';
import Link from '../components/Link';
import { emailProps, passwordProps } from '../constants/inputProps';
import { FormEvent, useState } from 'react';

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

function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const onUpdateField = (e: FormEvent) => {
    const nextFormState = {
      ...form,
      [(e.target as HTMLInputElement)?.name]:
        (e.target as HTMLInputElement)?.value || (e.target as HTMLInputElement)?.value,
    };
    setForm(nextFormState);
  };

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };
  return (
    <form onSubmit={onSubmitForm}>
      <h1 className="fs-xxl fw-600">Login to your account</h1>
      <Input {...emailProps} value={form.email} onChange={onUpdateField} />
      <Input {...passwordProps} value={form.password} onChange={onUpdateField} />
      <Input
        {...rememberProps}
        {...{
          other: {
            checked: form.remember,
          },
        }}
        onChange={onUpdateField}
      />
      <div>
        <Button {...buttonProps} />
      </div>
      <div>
        <Link page="/RegisterPage">
          <Button {...registerProps}></Button>
        </Link>
      </div>
    </form>
  );
}

export default LoginPage;
