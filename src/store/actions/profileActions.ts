// export const updateName =
//   ({ firstName, lastName, email, address, password, dateOfBirth }: Customer) =>
//   (dispatch: AppDispatch) =>
//     createCustomer({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       address: address,
//       password: password,
//       dateOfBirth: dateOfBirth,
//     }).then(
//       () => {
//         dispatch({
//           type: AuthActions.REGISTER_SUCCESS,
//         });
//         return Promise.resolve('Account succesfully created!');
//       },
//       (error) => {
//         const message =
//           (error.response && error.response.data && error.response.data.message) ||
//           error.message ||
//           error.toString();

//         dispatch({
//           type: AuthActions.REGISTER_FAIL,
//         });

//         return Promise.reject(message);
//       },
//     );
