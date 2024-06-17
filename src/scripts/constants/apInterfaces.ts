import { ProfileActions } from './enums';

import * as commercetools from '@commercetools/platform-sdk';
type LineItem = commercetools.LineItem;
type CentPrecisionMoney = commercetools.CentPrecisionMoney;
type DiscountOnTotalPrice = commercetools.DiscountOnTotalPrice;

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

// export interface Cart {
//   cart: CartState;
// }

export interface Cart {
  cart: CartState;
}

export interface CartState {
  id: string;
  version: number;
  lineItems: LineItem[];
  totalPrice: CentPrecisionMoney;
  discountOnTotalPrice?: DiscountOnTotalPrice;
}

export interface Auth {
  auth: AuthState;
}

export interface AuthState {
  isLoggedIn: boolean;
  anonymousId?: string;
  user: {
    id?: string;
    email: string;
    password: string;
    addresses: Array<Address>;
    billingAddressIds: Array<string>;
    shippingAddressIds: Array<string>;
    version: number;
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
