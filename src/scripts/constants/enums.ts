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

export enum addAddressType {
  BILLING = 'addBillingAddressId',
  SHIPPING = 'addShippingAddressId',
}

export enum addDefaultAddressType {
  BILLING = 'setDefaultBillingAddress',
  SHIPPING = 'setDefaultShippingAddress',
}

export enum AuthActions {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  GET_USER = 'GET_USER',
  REGISTER_FAIL = 'REGISTER_FAIL',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT = 'LOGOUT',
  SET_MESSAGE = 'SET_MESSAGE',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
  UPDATE_FAIL = 'UPDATE_FAIL',
  PASS_SUCCESS = 'PASS_SUCCESS',
  PASS_FAIL = 'PASS_FAIL',
  ADD_ADDRESS = 'ADD_ADDRESS',
  REMOVE_ADDRESS = 'REMOVE_ADDRESS',
  SET_DEFAULT_ADDRESS = 'SET_DEFAULT_ADDRESS',
}

export enum CartActions {
  GET_CART = 'GET_CART',
  CREATE_CART = 'CREATE_CART',
  ACTIVATE_DISCOUNT = 'ACTIVATE_DISCOUNT',
  CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY',
  DELETE_ITEM = 'DELETE_ITEM',
  CLEAR_CART = 'CLEAR_CART',
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
