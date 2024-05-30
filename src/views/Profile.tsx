import { PencilIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { Auth } from '../scripts/constants/apInterfaces';
import Input from '../components/Input';
import { FormEvent, useState } from 'react';
import { InputType, ButtonType } from '../scripts/constants/enums';

import Button from '../components/Button';
import { validate } from '../scripts/helpers/validation';
import { validateFields } from '../scripts/helpers/fieldHandler';
const formConfig = [
  {
    type: InputType.text,
    label: 'First name',
    name: 'firstName',
    other: {
      'aria-label': 'First name',
      required: true,
    },
  },
  {
    type: InputType.text,
    label: 'Last name',
    name: 'lastName',
    other: {
      'aria-label': 'Last name',
      required: true,
    },
  },
];

export default function Profile() {
  const user = useSelector((state: Auth) => state.auth.user);
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    Object.keys(formConfig).reduce((acc: Record<string, string>, item: string) => {
      acc[item] = '';
      return acc;
    }, {}),
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [values, setValues] = useState(
    formConfig.reduce(
      (
        acc: Record<string, { value: string | number | boolean | undefined; disabled: boolean }>,
        item,
      ) => {
        acc[item.name] = {
          value: user[item.name as keyof typeof user],
          disabled: true,
        };
        return acc;
      },
      {},
    ),
  );

  const onChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    validateFields(e, setErrors, errors, validate);
    if (errors.length) {
      setIsDisabled(true);
    } else setIsDisabled(false);
    setValues({
      ...values,
      [name]: {
        value: value,
        disabled: values[name].disabled,
      },
    });
  };

  const onSubmit = () => {};
  const handleClick = (name: string) => {
    const obj = values[name];
    setValues({
      ...values,
      [name as string]: {
        value: obj.value,
        disabled: !obj.disabled,
      },
    });
  };
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Profile</h1>
        <div className="profile">
          <form onSubmit={onSubmit}>
            {formConfig.map((item) => {
              return (
                <Input
                  key={item.name}
                  name={item.name}
                  label={item.label}
                  inputClass="input input-editable"
                  value={values[item.name as keyof typeof values].value as string}
                  disabled={values[item.name as keyof typeof values].disabled}
                  onChange={onChange}
                >
                  <PencilIcon className="h-4" onClick={() => handleClick(item.name)} />
                </Input>
              );
            })}
          </form>
          <Button
            type={ButtonType.submit}
            text="Save"
            class="button"
            disabled={isDisabled}
          ></Button>
        </div>
      </div>
    </>
  );
}
