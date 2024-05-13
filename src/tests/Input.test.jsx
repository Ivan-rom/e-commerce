import Input from '../components/Input';
import { render, screen, fireEvent } from '@testing-library/react';

function hasInputValue(e, inputValue) {
  return screen.getByDisplayValue(inputValue) === e;
}

it('should render as expected when properties are being passed', () => {
  // Arrange
  const props = {
    name: 'test name',
    label: 'test label',
    value: 'test value',
    onChange: () => {},
  };

  // Act
  const component = () => <Input {...props} />;

  // Assert
  expect(component).toMatchSnapshot();
});

it('should render as expected when passing required and optional properties', () => {
  // Arrange
  const props = {
    name: 'test name',
    label: 'test label',
    value: 'test value',
    onChange: () => {},
    error: 'test error',
    type: 'test type',
  };

  // Act
  const component = () => <Input {...props} />;

  // Assert
  expect(component).toMatchSnapshot();
});

it('should call to onChange prop when simulate input onChange', async () => {
  // Arrange
  const props = {
    name: 'test name',
    label: 'test label',
    value: 'test value',
    onChange: jest.fn(),
    error: 'test error',
    type: 'text',
    placeholder: 'enter text here',
    other: {
      'data-testid': 1232134,
    },
  };

  // Act
  render(<Input {...props} />);
  const input = await screen.findByTestId(props.other['data-testid']);
  const value = 'VERY IMPORTANT TEXT';
  fireEvent.change(input, {
    target: {
      value: value,
    },
  });

  // Assert
  expect(hasInputValue(input, value)).toBe(true);
});
