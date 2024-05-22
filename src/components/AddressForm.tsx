import Input from './Input';
import { InputType } from '../scripts/constants/enums';
import { useState, FormEvent } from 'react';
import { validate } from '../scripts/helpers/validation';
import { validateFields } from '../scripts/helpers/fieldHandler';
import Select from './Select';
import { countries } from '../scripts/data/countryList';
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
  value,
}: {
  title: string;
  value: { city: string; street: string; postalCode: string; country: string };
}) {
  const [address, setAddress] = useState(value);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    city: '',
    street: '',
    postalCode: '',
    country: '',
  });

  const onUpdateField = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === 'postalCode') {
      validateFields(e, setErrors, errors, validate, address.postalCode);
    } else validateFields(e, setErrors, errors, validate);
    setAddress({ ...address, [name]: value });
  };

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).join('').length > 0) {
      return;
    }
  };
  return (
    <div className="border-slate-200 my-3 border-2 p-2 rounded">
      <div className="font-semibold"> {title} </div>
      <fieldset onSubmit={onSubmitForm} className="flex gap-5 flex-wrap">
        <Select
          options={countries}
          label="Country"
          defaultOption="Select country"
          name="country"
        ></Select>
        <div className="grow">
          <Input {...city} value={address.city} onChange={onUpdateField} class="w-100"></Input>{' '}
          {errors.city && <div className="text-rose-600">{errors.city}</div>}
        </div>
        <div className="basis-8/12">
          <Input {...street} value={address.street} onChange={onUpdateField} class="w-100"></Input>
          {errors.street && <div className="text-rose-600">{errors.street}</div>}
        </div>
        <div className="grow">
          <Input
            {...postalCode}
            value={address.postalCode}
            onChange={onUpdateField}
            class="w-100"
          ></Input>
          {errors.postalCode && <div className="text-rose-600">{errors.postalCode}</div>}
        </div>
      </fieldset>
    </div>
  );
}
