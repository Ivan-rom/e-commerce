const containsUppercase = (str: string) => Boolean(str.match(/[A-Z]/));
const containsLowercase = (str: string) => Boolean(str.match(/[a-z]/));
const containsNumber = (str: string) => Boolean(str.match(/\d/));
const containsSpecialCharacters = (str: string) => Boolean(str.match(/[!@#$%^&*+№]/));
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

const calculateAge = (date: Date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  let age = currentYear - date.getFullYear();

  if (currentMonth < date.getMonth() - 1) {
    age--;
  }
  if (date.getMonth() - 1 == currentMonth && currentDay < date.getDate()) {
    age--;
  }
  return age;
};

const textChecker = (str: string) => (str.length > 0 ? '' : 'Must contain at least one character');

const checkCity = (str: string) => {
  const errorsList = [];
  errorsList.push(textChecker(str));
  if (containsSpecialCharacters(str)) {
    errorsList.push(textChecker("Shouldn't contain special characters"));
  }
  if (containsNumber(str)) {
    errorsList.push(textChecker("Shouldn't contain numbers"));
  }
  return errorsList;
};

const dateChecker = (str: string) => {
  const errorsList = [];
  const date = new Date(str);
  if (calculateAge(date) <= 13) {
    errorsList.push('You should be more than 13 years old');
  }
  return errorsList;
};

const codeChecker = (str: string, country: string) => {
  const errorsList = [];
  if (country === 'UK' && Boolean(str.match(/^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/))) {
    errorsList.push(
      'The provided code does not match the UK postal code pattern (example: GIR 0AA)',
    );
  } else if (country === 'US' && Boolean(str.match(/^\d{5}(?:[-\s]\d{4})?$/))) {
    errorsList.push(
      'The provided code does not match the US zip code pattern (example: 12345 1234)',
    );
  }
  return errorsList;
};

export const validate = (input: HTMLInputElement, country?: string): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  switch (input.name) {
    case 'email':
      errors.email = emailChecker(input.value).join('\n');
      break;
    case 'password':
      errors.password = passwordChecker(input.value).join('\n');
      break;
    case 'birthday':
      errors.birthday = dateChecker(input.value).join('\n');
      break;
    case 'street':
      errors.city = textChecker(input.value);
      break;
    case 'city':
      errors.city = checkCity(input.value).join('\n');
      break;
    case 'postalCode':
      errors.postalCode = codeChecker(input.value, country as string).join('\n');
      break;
    default:
      break;
  }
  return errors;
};
