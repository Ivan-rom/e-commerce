import { ChangeEvent, ReactNode } from 'react';
import { ButtonType, InputType, PageNames } from './enums';

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

export type pageInfo = { to: string; name: PageNames; text: string; className: string };
