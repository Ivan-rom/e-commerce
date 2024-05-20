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
  console.log(draft);
  return apiRoot
    .customers()
    .post({
      body: {
        firstName: draft.firstName,
        lastName: draft.lastName,
        email: draft.email,
        password: draft.password,
        dateOfBirth: draft.dateOfBirth,
      },
    })
    .execute();
};
// export const signinCustomer = (creditials: AuthData) => apiRoot.;

// console.log(getProject());
