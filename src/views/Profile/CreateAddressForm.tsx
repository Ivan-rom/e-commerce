import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../scripts/hooks/storeHooks';
import { Auth, userAddress } from '../../scripts/constants/apInterfaces';
import { addAddress } from '../../store/actions/profileActions';
import { ButtonType } from '../../scripts/constants/enums';
import Button from '../../components/Button';
import Address from '../../components/AddressForm';
import { AddressFormElements } from '../../scripts/constants/types';
import { useSelector } from 'react-redux';

export default function CreateAddressForm() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: Auth) => state.auth.user);
  const [address, setAddress] = useState<userAddress>({
    title: '',
    city: '',
    streetName: '',
    postalCode: '',
    country: '',
  });
  const onSubmit = async (e: FormEvent) => {
    const target = e.currentTarget as AddressFormElements;
    const elements = target.elements;
    if (!Object.values(address).every((el) => el.length > 0)) {
      return Promise.reject('No address provided');
    }
    const addressObj = {
      ...elements,
    };

    return await dispatch(addAddress(user.id as string, user.version as number, addressObj));
  };
  return (
    <form>
      <Address
        title="Create new address"
        address={address}
        handleChange={setAddress}
        classes="bg-sky-200 mx-auto"
      ></Address>
      <Button
        text="Create address"
        class="button mx-auto bg-sky-50"
        type={ButtonType.submit}
        onClick={(e: FormEvent) => onSubmit(e)}
      ></Button>
    </form>
  );
}
