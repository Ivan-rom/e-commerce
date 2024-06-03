import Address from '../../components/AddressForm';
import { MotionConfig, motion } from 'framer-motion';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { Auth, userAddress } from '../../scripts/constants/apInterfaces';
import { ButtonType } from '../../scripts/constants/enums';
import Modal from 'react-modal';
import CreateAddressForm from './CreateAddressForm';
export default function Addresses() {
  const state = useSelector((state: Auth) => state);
  const [values, setValues] = useState(
    state.auth.user.addresses.reduce(
      (acc, item) => {
        if (item.id) {
          acc[item.id] = { ...item } as userAddress;
        }
        return acc;
      },
      {} as {
        [key: string]: userAddress;
      },
    ),
  );

  const handleChange = (index: number, e: userAddress) => {
    return setValues((prevValues) => {
      const newValues = { ...prevValues };
      newValues[index] = e;

      console.log(index, e, values);
      return newValues;
    });
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalActions = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
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
        {Object.entries(values)
          .filter(([key]) => state.auth.user.billingAddressIds?.includes(key as string))
          ?.map(([key, item]: [string, userAddress], index) => (
            <div key={index}>
              {state.auth.user.defaultBillingAddressId === key && (
                <div>
                  <Address
                    title={item.title as string}
                    key={index}
                    address={item}
                    classes="bg-sky-200"
                    handleChange={(e: userAddress) => handleChange(index, e)}
                  />
                  <div className="text-xs -mt-2 mb-4 text-sky-900">
                    Current default billing address
                  </div>
                </div>
              )}
              {state.auth.user.defaultBillingAddressId !== item.id && (
                <Address
                  title={item.title as string}
                  key={index}
                  address={item}
                  classes=""
                  handleChange={(e: userAddress) => handleChange(index, e)}
                />
              )}
            </div>
          ))}
        <h3 className="font-bold text-xl"> Shipping addresses </h3>
        {Object.entries(values)
          .filter(
            ([key]) =>
              Array.isArray(state.auth.user.shippingAddressIds) &&
              state.auth.user.shippingAddressIds?.includes(key as string),
          )
          ?.map(([key, item]: [string, userAddress], index) => (
            <div key={index}>
              {state.auth.user.defaultShippingAddressId === key && (
                <div>
                  <Address
                    title={item.title as string}
                    key={index}
                    address={item}
                    classes="bg-sky-200"
                    handleChange={(e: userAddress) => handleChange(index, e)}
                  />
                  <div className="text-xs  -mt-2 mb-4 text-sky-900">
                    Current default shipping address
                  </div>
                </div>
              )}
              {state.auth.user.defaultShippingAddressId !== item.id && (
                <Address
                  title={item.title as string}
                  key={index}
                  address={item}
                  classes=""
                  handleChange={(e: userAddress) => handleChange(index, e)}
                />
              )}
            </div>
          ))}
        <ToastContainer position="bottom-center" theme="colored" autoClose={2000} />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={modalActions.close}
          contentLabel="Add address"
          className="w-fit h-fit translate-y-1/4 mx-auto"
        >
          <CreateAddressForm
            submitter={() => {
              modalActions.close();
              toast.success('Succesfully created!', { position: 'bottom-center' });
            }}
          ></CreateAddressForm>
        </Modal>
      </motion.div>
    </MotionConfig>
  );
}
