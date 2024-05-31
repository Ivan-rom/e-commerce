export enum ButtonType {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}

export enum InputType {
  text = 'text',
  number = 'number',
  email = 'email',
  password = 'password',
  checkbox = 'checkbox',
  date = 'date',
}

export enum FieldType {
  input,
  select,
}

export enum AuthActions {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAILS',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT = 'LOGOUT',
  SET_MESSAGE = 'SET_MESSAGE',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
}

export enum PageNames {
  main = 'main',
  login = 'login',
  register = 'register',
}

export enum ProfileActions {
  firstName = 'setFirstName',
  lastName = 'setLastName',
  dateOfBirth = 'setDateOfBirth',
  email = 'changeEmail',
}
