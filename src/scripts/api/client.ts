import { ctpClient } from './buildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Customer, AuthData } from '../constants/apInterfaces';
// import { ProfileActions } from '../constants/enums';
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
// export const updateInfo = ( // TODO: find a way to set actions by taking
//   id: string,
//   version: number,
//   actions: Array<{ action: ProfileActions; [x: string]: string | number | boolean }>,
// ) => {
//   return apiRoot
//     .customers()
//     .withId({ ID: id })
//     .post({
//       body: {
//         version: version,
//         actions: [
//           ...actions.map((el) => {
//             return { ...el, action: el.action };
//           }),
//         ],
//       },
//     })
//     .execute();
// };

export const changePassword = (currentPassword: string, newPassword: string, version: number) => {
  return apiRoot
    .me()
    .password()
    .post({
      body: { version: version, currentPassword: currentPassword, newPassword: newPassword },
    })
    .execute();
};
