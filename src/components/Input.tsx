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
  inputClass?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: 'number';
  autofocus?: boolean;
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
          className={props.inputClass || 'input'}
          {...props.other}
          type={type}
          name={props.name}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={value}
          id={props.id}
          checked={props.checked}
          onChange={(e) => {
            if (e.target.type === InputType.checkbox) {
              e.target.checked = !e.target.checked;
            } else setValue(e.target.value);
            e && props.onChange?.(e);
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
