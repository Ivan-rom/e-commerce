import { InputType } from '../../scripts/constants/enums';

export const infoFormConfig = [
  {
    type: InputType.text,
    label: 'First name',
    name: 'firstName',
    other: {
      'aria-label': 'First name',
      required: true,
    },
  },
  {
    type: InputType.text,
    label: 'Last name',
    name: 'lastName',
    other: {
      'aria-label': 'Last name',
      required: true,
    },
  },
  {
    type: InputType.date,
    label: 'Date of birth',
    name: 'dateOfBirth',
    other: {
      'aria-label': 'Date of birth',
      required: true,
    },
  },
  {
    type: InputType.email,
    label: 'Email',
    name: 'email',
    other: {
      'aria-label': 'Email',
      required: true,
    },
  },
];

export const passwordFormConfig = [
  {
    type: InputType.password,
    label: 'Current password',
    name: 'currentPassword',
    disabled: false,
    other: {
      'aria-label': 'Current password',
      required: true,
    },
  },
  {
    type: InputType.password,
    label: 'New password',
    name: 'newPassword',
    disabled: true,
    other: {
      'aria-label': 'New password',
      required: true,
    },
  },
];
