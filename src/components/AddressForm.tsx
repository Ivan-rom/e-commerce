import Input from './Input';
import { userAddress } from '../scripts/constants/apInterfaces';
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
  name: 'streetName',
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
  classes,
  disabled,
}: {
  title: string;
  address: { city: string; streetName: string; postalCode: string; country: string };
  handleChange: (e: userAddress) => void;
  classes: string;
  disabled?: boolean;
}) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    city: '',
    streetName: '',
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
      validateFields(e, setErrors, errors, validate, address.postalCode);
    }
    handleChange({ ...address, [name]: value });
  };

  return (
    <MotionConfig transition={{ duration: 2 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={`border-slate-200 my-3 border-2 p-2 rounded w-2/3 ${classes}`}>
          <div className="font-semibold"> {title} </div>
          <fieldset className="flex gap-5 flex-wrap">
            <Select
              options={countries}
              label="Country"
              defaultOption={address.country || 'Select country'}
              name="country"
              onChange={onUpdateAddressField}
              disabled={disabled}
            ></Select>
            <div className="grow">
              <Input
                {...city}
                value={address.city}
                onChange={onUpdateField}
                class="w-100"
                inputClass="input input-editable disabled:bg-inherit block"
                disabled={disabled}
              ></Input>
              {errors.city && <div className="error">{errors.city}</div>}
            </div>
            <div className="basis-8/12">
              <Input
                {...street}
                value={address.streetName}
                onChange={onUpdateField}
                class="w-100"
                inputClass="input input-editable disabled:bg-inherit block"
                disabled={disabled}
              ></Input>
              {errors.streetName && <div className="error">{errors.street}</div>}
            </div>
            <div className="grow">
              <Input
                {...postalCode}
                value={address.postalCode}
                onChange={onUpdateField}
                class="w-100 flex gap-2 items-center my-3"
                inputClass="input input-editable disabled:bg-inherit block"
                disabled={disabled}
              ></Input>
              {errors.postalCode && <div className="error">{errors.postalCode}</div>}
            </div>
          </fieldset>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
