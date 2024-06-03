import { ProfileActions } from './enums';

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  address?: Array<Address>;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface Address {
  id?: string;
  title: string;
  firstName: string;
  lastName: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  // building: string;
  // apartment: string;
}

export interface Auth {
  auth: AuthState;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: {
    email: string;
    password: string;
    addresses: Array<Address>;
    billingAddressIds: Array<string>;
    shippingAddressIds: Array<string>;
    [key: string]: string | number | boolean | Array<Address> | Array<string> | undefined;
  };
}

export interface UpdateAction {
  action: ProfileActions;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface userAddress {
  id?: string;
  title?: string;
  city: string;
  streetName: string;
  postalCode: string;
  country: string;
}

export interface Updates {
  id: string;
  version: number;
  actions: Customer;
}
