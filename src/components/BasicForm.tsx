import Input from './Input';
import Button from './Button';
import { InputProps, ButtonProps } from '../constants/types';
import { FormEvent, useState } from 'react';

interface fieldConfig {
  props: InputProps;
  name: string;
  default: boolean | string;
}

interface Props {
  title: string;
  fields: Array<fieldConfig>;
  submitButton: ButtonProps;
}

function BasicForm({ title, fields, submitButton }: Props) {
  const vars = fields.reduce((acc: { [key: string]: string | boolean }, field) => {
    acc[field.name] = field.default;
    return acc;
  }, {});

  const [form, setForm] = useState(vars);

  const onUpdateField = (e: FormEvent) => {
    const nextFormState = {
      ...form,
      [(e.target as HTMLInputElement)?.name]:
        (e.target as HTMLInputElement)?.value || (e.target as HTMLInputElement)?.checked,
    };
    setForm(nextFormState);
  };

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <form onSubmit={onSubmitForm}>
      <h1 className="fs-xxl fw-600">{title}</h1>
      {fields.map((field, index) => {
        if (typeof field.default === 'string') {
          return (
            <Input
              {...field.props}
              key={index}
              value={form[field.name] as string}
              onChange={onUpdateField}
            />
          );
        }
        return (
          <Input
            {...field.props}
            key={index}
            {...{
              other: {
                checked: form[field.name],
              },
            }}
            onChange={onUpdateField}
          />
        );
      })}
      <div>
        <Button {...submitButton} />
      </div>
    </form>
  );
}

export default BasicForm;
