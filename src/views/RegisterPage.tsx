import Input from '../components/Input';
import InputType from '../constants/inputTypes';
import ButtonType from '../constants/buttonTypes';
import Button from '../components/Button';
import Link from '../components/Link';
import { emailProps, passwordProps } from '../constants/inputProps';

const rememberProps = {
  type: InputType.checkbox,
  label: (
    <div>
      By checking this box, you are agreeing to our <Link page="/terms"> terms of service. </Link>
    </div>
  ),
  name: 'remember',
  text: 'Login',
};

const buttonProps = {
  type: ButtonType.submit,
  text: 'Register',
};

const loginProps = {
  text: 'Login',
};

function RegisterPage() {
  return (
    <form>
      <h1 className="fs-xxl fw-600">Register</h1>
      <Input {...emailProps} />
      <Input {...passwordProps} />
      <Input {...rememberProps} />
      <div>{<Button {...buttonProps} />}</div>
      <div>
        <Link page="/loginPage">
          <Button {...loginProps}></Button>
        </Link>
      </div>
    </form>
  );
}

export default RegisterPage;
