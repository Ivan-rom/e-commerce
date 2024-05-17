export interface Customer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface Address {
  address: {
    title: string;
    firstName: string;
    lastName: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
    building: string;
    apartment: string;
  };
}
