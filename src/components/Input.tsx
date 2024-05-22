import { ChangeEvent, ReactNode, useState } from 'react';
import { InputType } from '../scripts/constants/enums';
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
  class?: string;
}

export default function Input({ ...props }: InputProps) {
  const [value, setValue] = useState(props.value);
  const [type, setType] = useState(props.type);
  const [isVisible, setVisibility] = useState(false);
  return (
    <div className={props.class || 'flex gap-2 items-center my-3'}>
      <div>
        <label htmlFor={props.name}> {props.label} </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...props.other}
          type={type}
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={value}
          id={props.id}
          onChange={(e) => {
            setValue(e.target.value);
            console.log(e.target);
            props.onChange?.(e);
          }}
        />
      </div>
      {props.type === InputType.password && (
        <button
          type="button"
          onClick={() => {
            setVisibility(!isVisible);
            setType(type === 'password' ? InputType.text : InputType.password);
          }}
        >
          {isVisible ? (
            <EyeIcon className="size-6 text-slate-600 mt-4" />
          ) : (
            <EyeSlashIcon className="size-6 mt-4 text-gray-500" />
          )}
        </button>
      )}
      {props.children}
    </div>
  );
}
