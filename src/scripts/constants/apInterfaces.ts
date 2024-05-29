export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  address: Array<Address>;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface Address {
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
    user: {
      [key: string]: string | number | boolean | undefined;
    };
  };
}
