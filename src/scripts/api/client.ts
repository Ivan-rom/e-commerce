import { ctpClient } from './buildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Customer, AuthData } from '../constants/apInterfaces';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: <string>process.env.REACT_APP_KEY,
});

export const authenticateCustomer = (data: Customer | AuthData) =>
  apiRoot
    .login()
    .post({
      body: { ...data },
    })
    .execute();

export const getUserInfo = async () => {
  return await apiRoot.me().get().execute();
};

export const createCustomer = (draft: Customer) => {
  return apiRoot
    .customers()
    .post({
      body: {
        firstName: draft.firstName,
        lastName: draft.lastName,
        email: draft.email,
        password: draft.password,
        dateOfBirth: draft.dateOfBirth,
        addresses: draft.address,
        defaultBillingAddress: 0,
        defaultShippingAddress: 1,
      },
    })
    .execute();
};
export const updateInfo = (id: string, version: number, actions: Customer) => {
  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'setFirstName',
            firstName: actions.firstName,
          },
          {
            action: 'setLastName',
            lastName: actions.lastName,
          },
          {
            action: 'changeEmail',
            email: actions.email,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: actions.dateOfBirth,
          },
          // {
          //   action: 'changeEmail',
          //   email: 'test',
          // },
        ],
      },
    })
    .execute();
};

export const changePassword = (currentPassword: string, version: number, newPassword: string) => {
  return apiRoot
    .me()
    .password()
    .post({
      body: { version: version, currentPassword: currentPassword, newPassword: newPassword },
    })
    .execute();
};

export const getProducts = () => {
  return apiRoot.products().get().execute();
};

export const getProduct = (id: string) => {
  return apiRoot.products().withId({ ID: id }).get().execute();
};

export const getCategory = (id: string) => {
  return apiRoot.categories().withId({ ID: id }).get().execute();
};
