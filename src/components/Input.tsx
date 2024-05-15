import { ChangeEvent, ReactNode, useState } from 'react';
import { InputType } from '../constants/enums';
interface InputProps {
  type?: InputType;
  label: string | ReactNode;
  value?: string | number;
  name: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: 'number';
  other?: object;
}

export default function Input({ ...props }: InputProps) {
  const [value, setValue] = useState(props.value);
  return (
    <div>
      <p>
        <label htmlFor={props.name}> {props.label} </label>
      </p>
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
          props.onChange?.(e);
        }}
      />
      {props.error && <div className="input-error"> Fill the field </div>}
    </div>
  );
}
