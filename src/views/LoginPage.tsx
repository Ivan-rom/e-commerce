import Input from '../components/Input';
import InputType from '../constants/inputTypes';
import ButtonType from '../constants/buttonTypes';
import Button from '../components/Button';
import Link from '../components/Link';
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

function LoginPage() {
  return (
    <form>
      <h1 className="fs-xxl fw-600">Login to your account</h1>
      <Input {...emailProps} />
      <Input {...passwordProps} />
      <Input {...rememberProps} />
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
