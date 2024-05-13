import { ChangeEvent, useState } from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  label: string;
  value?: string | number;
  name: string;
  placeholder: string;
  error: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: 'number';
  other: object;
}

export default function Input({ ...props }: InputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <div>
      <label htmlFor={props.label}> {props.label} </label>
      <input
        {...props.other}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
        value={value}
        id={props.id}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange(e);
        }}
      />
      {props.error && <div className="input-error"> Fill the field </div>}
    </div>
  );
}
