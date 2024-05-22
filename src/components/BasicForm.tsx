import Input from './Input';
import Button from './Button';
import { InputProps, ButtonProps } from '../scripts/constants/types';
import { FormEvent, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFields } from '../scripts/helpers/fieldHandler';
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
  onSubmit?: (e: FormEvent) => Promise<string>;
  children?: ReactNode;
}

function BasicForm({ title, fields, submitButton, validate, onSubmit, children }: Props) {
  const defaultForm = fields.reduce(
    (acc, { name, default: value }) => ({ ...acc, [name]: value }),
    {},
  );
  const [form, setForm] = useState(defaultForm);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>(defaultForm);
  const navigate = useNavigate();

  const onUpdateField = (e: FormEvent) => {
    const { name, value, checked } = e.target as HTMLInputElement;
    validateFields(e, setErrors, errors, validate);
    setForm({ ...form, [name]: value || checked });
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).join('').length > 0) {
      return;
    }

    onSubmit?.(e)
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        setSubmitError(err);
        return;
      });
  };

  return (
    <form onSubmit={onSubmitForm} className="w-full">
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
      {children}
      {submitError && <div className="text-rose-600">{submitError}</div>}
      <div>
        <Button
          {...submitButton}
          class="gap-1 flex p-2 rounded-2xl border-black border hover:bg-backgroundHoverPrimary place-items-center"
        />
      </div>
    </form>
  );
}

export default BasicForm;
