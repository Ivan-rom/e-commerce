import Input from './Input';
import { InputType } from '../scripts/constants/enums';
import { useState, FormEvent } from 'react';
import { validate, codeChecker } from '../scripts/helpers/validation';
import { validateFields } from '../scripts/helpers/fieldHandler';
import Select from './Select';
import { countries } from '../scripts/data/countryList';
import { MotionConfig, motion } from 'framer-motion';
const city = {
  type: InputType.text,
  label: 'City',
  name: 'city',
  default: '',
};
const street = {
  type: InputType.text,
  label: 'Street',
  name: 'street',
  default: '',
};
const postalCode = {
  type: InputType.text,
  label: 'Postal code',
  name: 'postalCode',
  default: '',
};
export default function Address({
  title,
  address,
  handleChange,
}: {
  title: string;
  address: { city: string; street: string; postalCode: string; country: string };
  handleChange: React.Dispatch<
    React.SetStateAction<{
      city: string;
      street: string;
      postalCode: string;
      country: string;
    }>
  >;
}) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    city: '',
    street: '',
    postalCode: '',
    country: '',
  });

  const onUpdateField = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === 'postalCode') {
      validateFields(e, setErrors, errors, validate, address.country);
    } else validateFields(e, setErrors, errors, validate);
    handleChange({ ...address, [name]: value });
  };

  const onUpdateAddressField = (e: FormEvent) => {
    const { name, value } = e.target as HTMLSelectElement;
    if (codeChecker(address.postalCode, value).join().length > 0) {
      setErrors({
        ...errors,
        ['postalCode']: codeChecker(address.postalCode, value).join(),
      });
    }
    handleChange({ ...address, [name]: value });
  };

  return (
    <MotionConfig transition={{ duration: 2 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="border-slate-200 my-3 border-2 p-2 rounded w-2/3">
          <div className="font-semibold"> {title} </div>
          <fieldset className="flex gap-5 flex-wrap">
            <Select
              options={countries}
              label="Country"
              defaultOption="Select country"
              name="country"
              onChange={onUpdateAddressField}
            ></Select>
            <div className="grow">
              <Input {...city} value={address.city} onChange={onUpdateField} class="w-100"></Input>{' '}
              {errors.city && <div className="error">{errors.city}</div>}
            </div>
            <div className="basis-8/12">
              <Input
                {...street}
                value={address.street}
                onChange={onUpdateField}
                class="w-100"
              ></Input>
              {errors.street && <div className="error">{errors.street}</div>}
            </div>
            <div className="grow">
              <Input
                {...postalCode}
                value={address.postalCode}
                onChange={onUpdateField}
                class="w-100"
              ></Input>
              {errors.postalCode && <div className="error">{errors.postalCode}</div>}
            </div>
          </fieldset>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
