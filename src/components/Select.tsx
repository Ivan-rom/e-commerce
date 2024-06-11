import { ChangeEvent, ReactNode } from 'react';

interface SelectProps {
  label: string | ReactNode;
  options: Array<string>;
  defaultOption: string;
  name: string;
  disabled?: boolean;
  id?: 'number';
  class?: string;
  wrapperClass?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ ...props }: SelectProps) {
  return (
    <div className={props.wrapperClass}>
      <label htmlFor={props.name}> {props.label} </label>
      <select
        className={
          props.class ||
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        }
        name={props.name}
        disabled={props.disabled}
        // value={value}
        id={props.id}
        defaultValue={'DEFAULT'}
        onChange={(e) => {
          props.onChange?.(e);
        }}
      >
        <option value="DEFAULT" disabled>
          {props.defaultOption}
        </option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
