import Address from '../../components/AddressForm';
import { MotionConfig, motion } from 'framer-motion';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FormEvent, useEffect, useState } from 'react';
import { Auth, userAddress } from '../../scripts/constants/apInterfaces';
import { ButtonType } from '../../scripts/constants/enums';
import Modal from 'react-modal';
import CreateAddressForm from './CreateAddressForm';
import { XMarkIcon, CheckIcon, PencilIcon } from '@heroicons/react/24/solid';
import {
  removeAddress,
  setDefaultAddress,
  updateAddress,
} from '../../store/actions/profileActions';
import { useAppDispatch } from '../../scripts/hooks/storeHooks';

function createIdArray(array: Array<userAddress>) {
  return array.reduce(
    (acc, item) => {
      if (item.id) {
        acc[item.id] = { ...item } as userAddress;
      }
      return acc;
    },
    {} as {
      [key: string]: userAddress;
    },
  );
}
export default function Addresses() {
  const state = useSelector((state: Auth) => state.auth);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState(state.user);

  useEffect(() => {
    setUser({ ...state.user });
    setValues(createIdArray(user.addresses));
  }, [state, user.addresses]);

  const [values, setValues] = useState(createIdArray(user.addresses));
  const [modalActionIsOpen, setIsActionOpen] = useState(false);
  const onXmarkClick = (id: string) => {
    setCurrentId(id);
    setIsActionOpen(true);
  };
  const [currentId, setCurrentId] = useState('');
  const handleChange = (index: number, e: userAddress) => {
    return setValues((prevValues) => {
      const newValues = { ...prevValues };
      newValues[index] = e;
      return newValues;
    });
  };

  const setAsDefault = async (id: string, type: string) => {
    await dispatch(setDefaultAddress(user.id as string, user.version as number, id, type));
    toast.success('Default address has been changed');
  };

  const handleRemoval = async () => {
    await dispatch(removeAddress(user.id as string, user.version as number, currentId));
    setIsActionOpen(false);
    toast.success('Address removed');
  };
  const [editing, setEditing] = useState(
    user.addresses.reduce(
      (acc, item) => {
        acc[item.id as string] = true;
        return acc;
      },
      {} as { [key: string]: boolean },
    ),
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalActions = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    onXmarkClick: () => setIsActionOpen(!modalActionIsOpen),
  };
  const [address, setAddress] = useState<userAddress>({
    city: '',
    streetName: '',
    postalCode: '',
    country: '',
  });
  const onChange = (e: userAddress, item: userAddress) => {
    if (Object.values(address).join('').length === 0) {
      setAddress({
        city: item.city,
        streetName: item.streetName,
        postalCode: item.postalCode,
        country: item.country,
      });
    } else {
      setAddress(e);
    }
  };
  const onSubmit = async (e: FormEvent, addressId: string, type: string) => {
    e.preventDefault();
    const addressObj = {
      ...address,
    };
    await dispatch(
      updateAddress(user.id as string, user.version as number, addressObj, addressId, type),
    );
    setEditing(
      user.addresses.reduce(
        (acc, item) => {
          acc[item.id as string] = true;
          return acc;
        },
        {} as { [key: string]: boolean },
      ),
    );
    toast.success('Address updated');
  };
  const render = (addressGroup: Array<string>, defaultAddress: string, type: string) => {
    return (
      <>
        {Object.entries(values)
          .filter(([key]) => addressGroup?.includes(key as string))
          ?.map(([key, item]: [string, userAddress], index) => (
            <form key={index} className="flex flex-col relative">
              {defaultAddress === key && (
                <div>
                  <div>
                    <Address
                      title={item.title as string}
                      address={item}
                      classes="bg-sky-200 w-fit pb-6"
                      disabled={editing[item.id as string]}
                      handleChange={(e: userAddress) => onChange(e, item)}
                    />
                    {!editing[item.id as string] && (
                      <div className="flex gap-2 -mt-12 text-xs items-center mb-6 ml-4">
                        <span className="italic">Type</span>
                        <Button
                          text="Billing"
                          class="button-flat"
                          disabled={
                            !user.billingAddressIds.includes(item.id as string) &&
                            !user.shippingAddressIds.includes(item.id as string)
                          }
                        ></Button>
                        <Button
                          text="Shipping"
                          class="button-flat"
                          disabled={
                            !user.shippingAddressIds.includes(item.id as string) &&
                            !user.billingAddressIds.includes(item.id as string)
                          }
                        ></Button>
                        <Button
                          text="Both"
                          class="button-flat button-standart"
                          disabled={
                            user.shippingAddressIds.includes(item.id as string) &&
                            user.billingAddressIds.includes(item.id as string)
                          }
                        ></Button>
                      </div>
                    )}
                  </div>
                  <div className="w-fit text-xs -mt-2 mb-4 text-sky-900">
                    Current default {type} address
                  </div>
                  <Button
                    text="Billing"
                    class="basis-full"
                    disabled={
                      !user.billingAddressIds.includes(item.id as string) &&
                      !user.shippingAddressIds.includes(item.id as string)
                    }
                  ></Button>
                </div>
              )}
              {defaultAddress !== item.id && (
                <>
                  <Address
                    title={item.title as string}
                    address={item}
                    classes="w-fit pb-6"
                    disabled={editing[item.id as string]}
                    handleChange={(e: userAddress) => handleChange(index, e)}
                  />
                  {!editing[item.id as string] && (
                    <div className="flex gap-2 -mt-12 text-xs items-center mb-6 ml-4">
                      <span className="italic">Type</span>
                      <Button
                        text="Billing"
                        class="button-flat"
                        disabled={
                          !user.billingAddressIds.includes(item.id as string) &&
                          !user.shippingAddressIds.includes(item.id as string)
                        }
                      ></Button>
                      <Button
                        text="Shipping"
                        class="button-flat"
                        disabled={
                          !user.shippingAddressIds.includes(item.id as string) &&
                          !user.billingAddressIds.includes(item.id as string)
                        }
                      ></Button>
                      <Button
                        text="Both"
                        class="button-flat button-standart"
                        disabled={
                          user.shippingAddressIds.includes(item.id as string) &&
                          user.billingAddressIds.includes(item.id as string)
                        }
                      ></Button>
                    </div>
                  )}
                </>
              )}

              <div className="absolute cursor-pointer mt-6  flex gap-4 m-2 right-0 top-1">
                {defaultAddress !== item.id && editing[item.id as string] && (
                  <Button
                    text="Set as default"
                    class="button h-6"
                    onClick={() => setAsDefault(item.id as string, type)}
                  ></Button>
                )}
                {!editing[item.id as string] && (
                  <Button
                    type={ButtonType.submit}
                    text="Save"
                    class="button h-6"
                    onClick={async (e: FormEvent) => {
                      onSubmit(e, item.id as string, type);
                    }}
                  ></Button>
                )}
                <XMarkIcon
                  onClick={() => onXmarkClick(item.id as string)}
                  className="hover:text-rose-600 transition-all w-6 h-6"
                  title="Remove address"
                />
                <PencilIcon
                  className={`h-6 w-6 ${editing[item.id as string] ? '' : 'text-sky-800'}`}
                  name={item.title}
                  title="Edit address"
                  onClick={() =>
                    setEditing((prev) => ({
                      ...prev,
                      [item.id as string]: !prev[item.id as string],
                    }))
                  }
                />
              </div>
            </form>
          ))}
      </>
    );
  };
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-2/3">
        <Button
          text="Add new address"
          type={ButtonType.button}
          class="button my-5"
          onClick={() => modalActions.open()}
        ></Button>
        <h3 className="font-bold text-xl"> Billing addresses </h3>
        {render(user.billingAddressIds, user.defaultBillingAddressId as string, 'billing')}
        <h3 className="font-bold text-xl"> Shipping addresses </h3>
        {render(user.shippingAddressIds, user.defaultShippingAddressId as string, 'shipping')}

        <ToastContainer position="bottom-center" theme="colored" autoClose={2000} />
        <Modal
          isOpen={modalIsOpen}
          appElement={document.getElementById('#root') as HTMLElement}
          onRequestClose={modalActions.close}
          contentLabel="Add address"
          className="w-full sm:w-fit h-fit translate-y-1/4 sm:mx-auto"
        >
          <div className="relative w-2/3 m-auto">
            <CreateAddressForm
              submitter={() => {
                modalActions.close();
                toast.success('Succesfully created!', { position: 'bottom-center' });
              }}
            ></CreateAddressForm>
            <XMarkIcon
              onClick={modalActions.close}
              className="h-6 absolute top-5 cursor-pointer hover:text-rose-600 transition-all mt-5 w-6 right-0"
            />
          </div>
        </Modal>
        <Modal
          appElement={document.getElementById('#root') as HTMLElement}
          isOpen={modalActionIsOpen}
          className="m-auto flex flex-col z-50 relative bg-rose-600 text-sky-50 p-10 rounded translate-y-40 w-96"
        >
          <div>Are you sure you want to delete this address? This action in unrecoverable</div>
          <div className="actions flex mr-0 gap-10 m-auto">
            <CheckIcon
              onClick={(e: FormEvent) => {
                e.preventDefault();
                handleRemoval();
              }}
              className="h-6 top-5 cursor-pointer hover:text-sky-300 transition-all mt-5 -ml-8 w-6 text-sk"
            />
            <XMarkIcon
              onClick={modalActions.onXmarkClick}
              className="h-6 top-5 cursor-pointer hover:text-sky-300 transition-all mt-5 -ml-8 w-6"
            />
          </div>
        </Modal>
      </motion.div>
    </MotionConfig>
  );
}
