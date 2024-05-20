import Input from './Input';
import Button from './Button';
import { InputProps, ButtonProps } from '../scripts/constants/types';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface fieldConfig {
  props: InputProps;
  name: string;
  default: boolean | string;
}

interface Props {
  title: string;
  fields: Array<fieldConfig>;
  submitButton: ButtonProps;
  validate?: (inputs: HTMLInputElement) => { [key: string]: string };
  onSubmit?: (e: FormEvent) => Promise<void>;
}

function BasicForm({ title, fields, submitButton, validate, onSubmit }: Props) {
  const defaultForm = fields.reduce(
    (acc, { name, default: value }) => ({ ...acc, [name]: value }),
    {},
  );
  const [form, setForm] = useState(defaultForm);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>(defaultForm);
  const navigate = useNavigate();
  const validateFields = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const validationErrors = validate?.(target);
    if (validationErrors) {
      setErrors({ ...errors, [target.name]: validationErrors[target.name] });
    }

    return;
  };

  const onUpdateField = (e: FormEvent) => {
    const { name, value, checked } = e.target as HTMLInputElement;
    validateFields(e);
    setForm({ ...form, [name]: value || checked });
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).join('').length > 0) {
      return;
    }

    onSubmit?.(e)
      .then((data) => {
        console.log(data);
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
        setSubmitError(err);
        return;
      });

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
      {submitError && <div className="text-rose-600">{submitError}</div>}
      <div>
        <Button {...submitButton} />
      </div>
    </form>
  );
}

export default BasicForm;
