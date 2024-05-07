import { ChangeEvent } from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  label: string;
  value?: string | number;
  name: string;
  placeholder: string;
  error: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(
  { type, label, value, name, placeholder, error, disabled, onChange }: InputProps,
  classList: Array<string>,
) {
  return (
    <div className={classList.join(' ')}>
      <label htmlFor={label}> {label} </label>
      <input
        type={type || 'text'}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="input-error"> Fill the field </div>}
    </div>
  );
}
