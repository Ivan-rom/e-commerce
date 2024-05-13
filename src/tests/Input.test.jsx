import Input from '../components/Input';
import { render, screen, fireEvent } from '@testing-library/react';

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

it('should call to onChange prop when simulate input onChange', () => {
  // Arrange
  const props = {
    name: 'test name',
    label: 'test label',
    value: 'test value',
    onChange: jest.fn(),
    error: 'test error',
    type: 'text',
    placeholder: 'enter text here',
  };

  // Act
  render(<Input {...props} />);
  const component = screen.getByPlaceholderText(props.placeholder);
  const value = 'Entered Text';
  fireEvent.change(component, {
    target: {
      value,
    },
  });

  // Assert
  expect(component).toHaveValue('Entered Text');
});
