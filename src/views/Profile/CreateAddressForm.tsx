import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../scripts/hooks/storeHooks';
import { Auth, userAddress } from '../../scripts/constants/apInterfaces';
import { addAddress } from '../../store/actions/profileActions';
import { ButtonType } from '../../scripts/constants/enums';
import Button from '../../components/Button';
import Address from '../../components/AddressForm';
import Input from '../../components/Input';
// import { AddressFormElements } from '../../scripts/constants/types';
import { useSelector } from 'react-redux';
import Select from '../../components/Select';
export default function CreateAddressForm({ submitter }: { submitter: () => void }) {
  const dispatch = useAppDispatch();
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState({
    title: '',
  });
  const user = useSelector((state: Auth) => state.auth.user);
  const [address, setAddress] = useState<userAddress>({
    city: '',
    streetName: '',
    postalCode: '',
    country: '',
  });
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError({
        ...error,
        ['title']: 'Name this address',
      });
      return;
    }
    const addressObj = {
      ...address,
      title: title,
    };
    submitter();
    return await dispatch(addAddress(user.id as string, user.version as number, addressObj, type));
  };
  return (
    <form className="bg-sky-200 my-3 border-2 p-2 rounded w-3/4 mx-auto">
      <Input
        label="Address title"
        name="title"
        class="w-2/3 flex flex-col mx-auto my-3 px-4"
        placeholder="Type something"
        value={title}
        onChange={(e: FormEvent) => setTitle((e.target as HTMLInputElement).value)}
      ></Input>
      {error.title.length > 0 && <div className="error w-2/3 mx-auto"> {error.title} </div>}
      <Address
        title="Create new address"
        address={address}
        handleChange={setAddress}
        classes="bg-sky-200 mx-auto"
      ></Address>
      <Select
        wrapperClass="w-2/3 flex flex-col mx-auto my-3 px-4"
        name="type"
        label="Address type"
        options={['Billing', 'Shipping', 'Use for both']}
        defaultOption="Choose type"
        onChange={(e: FormEvent) => setType((e.target as HTMLSelectElement).value)}
      ></Select>
      {/* {error.type.length > 0 && <div className="error w-2/3 mx-auto"> {error.type} </div>} */}
      <Button
        text="Create address"
        class="button button-standart mx-auto"
        type={ButtonType.submit}
        disabled={!Object.values(address).every((el) => el.length > 0) || type.length === 0}
        onClick={(e: FormEvent) => onSubmit(e)}
      ></Button>
    </form>
  );
}
