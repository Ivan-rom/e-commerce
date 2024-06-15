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

export const getProducts = (offset: number = 0, pagesPerPage: number = 10) => {
  // return apiRoot.products().get().execute();
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories:exists`,
        limit: pagesPerPage,
        offset,
      },
    })
    .execute();
};

export const getProduct = (id: string) => {
  return apiRoot.products().withId({ ID: id }).get().execute();
};

export const getProductsByCategory = (categoryId: string) => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:"${categoryId}"`,
      },
    })
    .execute();
};

export const getCategories = () => {
  return apiRoot.categories().get().execute();
};

export const getCategory = (id: string) => {
  return apiRoot
    .categories()
    .withId({ ID: id })
    .get()
    .execute()
    .then((res) => res.body);
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

export const changeAddress = (
  id: string,
  version: number,
  addressId: string,
  address: userAddress,
) => {
  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'changeAddress',
            addressId: addressId,
            address: address,
          },
        ],
      },
    })
    .execute();
};
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

export const getDiscounts = () => {
  return apiRoot.productDiscounts().get().execute();
};

export const getDiscountById = (id: string) => {
  return apiRoot.productDiscounts().withId({ ID: id }).get().execute();
};

export const getCart = (id: string) => {
  return apiRoot.carts().withCustomerId({ customerId: id }).get().execute();
};

export const createCart = (customerId: string) => {
  return apiRoot
    .carts()
    .post({
      body: {
        customerId,
        currency: 'USD',
      },
    })
    .execute();
};

export const removeFromCart = (cartId: string, version: number, itemId: string) => {
  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId: itemId,
          },
        ],
      },
    })
    .execute();
};

export const addToCard = (cartId: string, version: number, productId: string) => {
  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addLineItem',
            productId,
          },
        ],
      },
    })
    .execute();
};
