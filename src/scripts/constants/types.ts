import { ChangeEvent, ReactNode } from 'react';
import { ButtonType, InputType } from './enums';

export type InputProps = {
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
};

export type ButtonProps = {
  text: string;
  type?: ButtonType;
};

interface LoginFormElementsCollection extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export interface LoginFormElements extends HTMLFormElement {
  readonly elements: LoginFormElementsCollection;
}

interface RegisterElementsCollection extends LoginFormElementsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  dateOfBirth: HTMLInputElement;
}

export interface RegisterFormElements extends HTMLFormElement {
  readonly elements: RegisterElementsCollection;
}
