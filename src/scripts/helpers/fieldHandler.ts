import { Dispatch, FormEvent, SetStateAction } from 'react';

export const validateFields = (
  e: FormEvent,
  setErrors: Dispatch<SetStateAction<{ [key: string]: string }>>,
  errors: { [key: string]: string },
  validate?: (inputs: HTMLInputElement, extra?: string) => { [key: string]: string },
  extra?: string,
) => {
  const target = e.target as HTMLInputElement;
  const validationErrors = validate?.(target, extra);
  if (validationErrors) {
    setErrors({ ...errors, [target.name]: validationErrors[target.name] });
  }

  return;
};
