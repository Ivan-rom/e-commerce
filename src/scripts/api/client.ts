import { ctpClient } from './buildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Customer, AuthData, userAddress } from '../constants/apInterfaces';
import { addAddressType, addDefaultAddressType } from '../constants/enums';
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: <string>process.env.REACT_APP_KEY,
});

export const authenticateCustomer = (data: Customer | AuthData) =>
  apiRoot.login().post({
    body: { ...data },
  });

export const getUserInfo = async (id: string) => {
  return await apiRoot
    .customers()
    .password()
    .post({
      body: {
        id: id,
        version: 3,
        currentPassword: '',
        newPassword: '',
      },
    })
    .execute();
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
        ],
      },
    })
    .execute();
};

export const changePassword = (
  id: string,
  version: number,
  currentPassword: string,
  newPassword: string,
) => {
  return apiRoot
    .customers()
    .password()
    .post({
      body: {
        id: id,
        version: version,
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
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

export const createAddress = (id: string, version: number, address: userAddress) => {
  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'addAddress',
            address: address,
          },
        ],
      },
    })
    .execute();
};

export const saveAsAddressType = (
  id: string,
  version: number,
  addressId: string,
  addAddressType: addAddressType,
) =>
  apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: addAddressType,
            addressId: addressId,
          },
        ],
      },
    })
    .execute();

export const saveAsBothAddressTypes = (id: string, version: number, addressId: string) =>
  apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: addAddressType.BILLING,
            addressId: addressId,
          },
          {
            action: addAddressType.SHIPPING,
            addressId: addressId,
          },
        ],
      },
    })
    .execute();

export const removeAddr = (id: string, version: number, addressId: string) =>
  apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'removeAddress',
            addressId: addressId,
          },
        ],
      },
    })
    .execute();

export const setDefaultAddr = (
  id: string,
  version: number,
  addressId: string,
  addressType: addDefaultAddressType,
) =>
  apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: addressType,
            addressId: addressId,
          },
        ],
      },
    })
    .execute();
