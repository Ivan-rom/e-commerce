import BasicForm from '../components/BasicForm';
import { ButtonType, InputType } from '../scripts/constants/enums';
import Input from '../components/Input';
import Link from '../components/Link';
import { emailProps, passwordProps } from '../scripts/constants/inputProps';
import { validate } from '../scripts/helpers/validation';
import { register } from '../store/actions/authenticationActions';
import { useAppDispatch } from '../scripts/hooks/storeHooks';
import { RegisterFormElements } from '../scripts/constants/types';
import { FormEvent, useState } from 'react';
import Address from '../components/AddressForm';
import { motion, MotionConfig } from 'framer-motion';

const firstName = {
  type: InputType.text,
  label: 'First name',
  name: 'firstName',
  other: {
    'aria-label': 'First name',
    required: true,
  },
};
const lastName = {
  type: InputType.text,
  label: 'Last name',
  name: 'lastName',
  other: {
    'aria-label': 'Last name',
    required: true,
  },
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
];

export default function Register() {
  const dispatch = useAppDispatch();
  // const address = { city: '', street: '', postalCode: '', country: '' };
  const [address, setAddress] = useState({ city: '', street: '', postalCode: '', country: '' });
  const [billingAddress, setBillingAddress] = useState(true);
  const onSubmit = async (e: FormEvent) => {
    const target = e.currentTarget as RegisterFormElements;

    const elements = target.elements;
    if (!Object.values(address).every((el) => el.length > 0)) {
      return Promise.reject('No address provided');
    }
    setBillingAddress(true);
    return await dispatch(
      register(
        elements.firstName.value,
        elements.lastName.value,
        elements.email.value,
        elements.password.value,
        elements.birthday.value,
      ),
    );
  };

  const handleAddressSet = (e: FormEvent) => {
    const { checked } = e.target as HTMLInputElement;
    setBillingAddress(!checked);
  };

  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="transition-all">
          {/* <Header navPages={[PageNames.main]} /> */}
          <BasicForm
            title="Register"
            fields={loginFields}
            submitButton={buttonProps}
            validate={validate}
            onSubmit={onSubmit}
          >
            <Address title="Shipping address" address={address} handleChange={setAddress}></Address>
            <Input
              type={InputType.checkbox}
              name="sameAsShipping"
              label="Use the same address for billing"
              value={`${billingAddress}`}
              onChange={handleAddressSet}
              checked={billingAddress}
            />
            <MotionConfig transition={{ duration: 0.1 }}>
              <motion.div
                initial={{
                  height: !billingAddress ? 0 : 'auto',
                  opacity: !billingAddress ? 0 : 1,
                  visibility: !billingAddress ? 'hidden' : 'visible',
                }}
                animate={{
                  height: !billingAddress ? 'auto' : 0,
                  opacity: !billingAddress ? 1 : 0,
                  visibility: !billingAddress ? 'visible' : 'hidden',
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
              >
                {/* {!billingAddress && ( */}
                <Address
                  title="Billing address"
                  address={address}
                  handleChange={setAddress}
                ></Address>
                {/* )} */}
              </motion.div>
            </MotionConfig>
          </BasicForm>

          <Link page="/login">Login</Link>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
