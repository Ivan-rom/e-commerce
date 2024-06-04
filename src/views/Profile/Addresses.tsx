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
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';
import { removeAddress, setDefaultAddress } from '../../store/actions/profileActions';
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

  const [modalIsOpen, setIsOpen] = useState(false);
  const modalActions = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    onXmarkClick: () => setIsActionOpen(!modalActionIsOpen),
  };
  const render = (addressGroup: Array<string>, defaultAddress: string, type: string) => {
    return (
      <>
        {Object.entries(values)
          .filter(([key]) => addressGroup?.includes(key as string))
          ?.map(([key, item]: [string, userAddress], index) => (
            <div key={index} className="flex relative w-max">
              {defaultAddress === key && (
                <div>
                  <div>
                    <Address
                      title={item.title as string}
                      address={item}
                      classes="bg-sky-200 w-fit"
                      handleChange={(e: userAddress) => handleChange(index, e)}
                    />
                  </div>
                  <div className="w-fit text-xs -mt-2 mb-4 text-sky-900">
                    Current default {type} address
                  </div>
                </div>
              )}
              {defaultAddress !== item.id && (
                <Address
                  title={item.title as string}
                  address={item}
                  classes="w-fit"
                  handleChange={(e: userAddress) => handleChange(index, e)}
                />
              )}
              <div className="absolute cursor-pointer mt-6  flex gap-4 m-2 right-0 top-1">
                {defaultAddress !== item.id && (
                  <Button
                    text="Set as default"
                    class="button h-6"
                    onClick={() => setAsDefault(item.id as string, type)}
                  ></Button>
                )}
                <XMarkIcon
                  onClick={() => onXmarkClick(item.id as string)}
                  className="hover:text-rose-600 transition-all w-6 h-6"
                />
              </div>
            </div>
          ))}
      </>
    );
  };
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
