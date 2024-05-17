import Input from './Input';
import Button from './Button';
import { InputProps, ButtonProps } from '../constants/types';
import { FormEvent, useState } from 'react';
// import { post } from '../api/client';

interface fieldConfig {
  props: InputProps;
  name: string;
  default: boolean | string;
}

interface Props {
  title: string;
  fields: Array<fieldConfig>;
  submitButton: ButtonProps;
  validate: (inputs: HTMLInputElement) => { [key: string]: string };
}

function BasicForm({ title, fields, submitButton, validate }: Props) {
  const defaultForm = fields.reduce(
    (acc, { name, default: value }) => ({ ...acc, [name]: value }),
    {},
  );
  const [form, setForm] = useState(defaultForm);

  const [errors, setErrors] = useState<{ [key: string]: string }>(defaultForm);

  const validateFields = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const validationErrors = validate(target);
    setErrors({ ...errors, [target.name]: validationErrors[target.name] });
    return;
  };

  const onUpdateField = (e: FormEvent) => {
    const { name, value, checked } = e.target as HTMLInputElement;

    validateFields(e);
    setForm({ ...form, [name]: value || checked });
  };

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).join('').length > 0) {
      return;
    }
    alert(JSON.stringify(form, null, 2)); // TODO: make an API call on successfull form submit
  };

  return (
    <form onSubmit={onSubmitForm}>
      <h1 className="fs-xxl fw-600">{title}</h1>
      {fields.map(({ props, name, default: fieldValue }, index) => (
        <div key={index}>
          <Input
            {...props}
            value={form[name as keyof typeof form]}
            onChange={onUpdateField}
            {...(typeof fieldValue !== 'string' && {
              other: { checked: form[name as keyof typeof form] },
            })}
          />
          {errors[name] && <div className="text-rose-600">{errors[name]}</div>}
        </div>
      ))}
      <div>
        <Button {...submitButton} />
      </div>
    </form>
  );
}

export default BasicForm;
