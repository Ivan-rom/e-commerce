const containsUppercase = (str: string) => Boolean(str.match(/[A-Z]/));
const containsLowercase = (str: string) => Boolean(str.match(/[a-z]/));
const containsNumber = (str: string) => Boolean(str.match(/\d/));
const containsSpecialCharacters = (str: string) => Boolean(str.match(/[!@#$%^&*]/));
const isValidEmail = (str: string) =>
  Boolean(str.match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/));
const containsDomainName = (str: string) =>
  Boolean(str.match(/([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/));
const passwordChecker = (password: string) => {
  const errorsList = [];
  if (password.length < 8) {
    errorsList.push('Password is too short');
  }
  if (!containsUppercase(password) || !containsLowercase(password)) {
    errorsList.push('Must contain at least one uppercase and lowercase letters');
  }
  if (!containsNumber(password)) {
    errorsList.push('Must contain at least one digit');
  }
  if (!containsSpecialCharacters(password)) {
    errorsList.push('Must contain at least one special character');
  }
  if (password.trim() !== password) {
    errorsList.push('Must not contain leading or trailing whitespace');
  }

  return errorsList;
};

const emailChecker = (email: string) => {
  const errorsList = [];
  if (email.length < 5) {
    errorsList.push('Email is too short');
  }
  if (!isValidEmail(email)) {
    errorsList.push('Must be properly formatted');
  }
  if (!containsDomainName(email)) {
    errorsList.push('Must contain a domain name (e.g., example.com)');
  }
  if (!email.includes('@')) {
    errorsList.push('Must contain an "@" symbol separating local part and domain name');
  }
  if (email.trim() !== email) {
    errorsList.push('Must not contain leading or trailing whitespace');
  }

  return errorsList;
};

export const validateLogin = (input: HTMLInputElement): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  switch (input.name) {
    case 'email':
      errors.email = emailChecker(input.value).join('\n');
      break;
    case 'password':
      errors.password = passwordChecker(input.value).join('\n');
      break;
    default:
      break;
  }
  return errors;
};

// export const validateRegistration = (inputValues: HTMLInputElement): { [key: string]: string } => {
//   const errors: { [key: string]: string } = {};
//   const elements = (inputValues as AuthFields).elements;
//   errors.email = emailChecker(elements.email.value).join('\n');
//   errors.password = passwordChecker(elements.password.value).join('\n');
//   return errors;
// };
