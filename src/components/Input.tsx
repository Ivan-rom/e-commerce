import { ChangeEvent, ReactNode, useState } from 'react';
import { InputType } from '../constants/enums';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

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
  children?: ReactNode;
}

export default function Input({ ...props }: InputProps) {
  const [value, setValue] = useState(props.value);
  const [type, setType] = useState(props.type);
  const [isVisible, setVisibility] = useState(false);
  return (
    <div>
      <p>
        <label htmlFor={props.name}> {props.label} </label>
      </p>
      <input
        {...props.other}
        type={type}
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
      {props.type === InputType.password && (
        <button
          type="button"
          onClick={() => {
            setVisibility(!isVisible);
            setType(type === 'password' ? InputType.text : InputType.password);
          }}
        >
          {isVisible ? (
            <EyeIcon className="size-6 text-blue-500" />
          ) : (
            <EyeSlashIcon className="size-6 text-blue-500" />
          )}
        </button>
      )}
      {props.children}
    </div>
  );
}
