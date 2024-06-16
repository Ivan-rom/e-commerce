import { FormEvent, useState } from 'react';
import { addToCard, deactivateCode } from '../scripts/api/client';
// import { CartState } from '../scripts/constants/apInterfaces';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import formatPrice from '../scripts/helpers/formatPrice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  activateDiscountAction,
  // clearCartAction
} from '../store/actions/cartActions';
import { useAppDispatch, useAppSelector } from '../scripts/hooks/storeHooks';

function BasketPage() {
  const state = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isClearing, setIsClearing] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  // function clearCart(cart: CartState) {
  //   dispatch(clearCartAction(cart));
  // }

  function submitDiscount(e: FormEvent) {
    e.preventDefault();
    dispatch(activateDiscountAction(state!.cart, discountCode))
      .then(() => toast.success('Discount activated!'))
      .catch(() => toast.error("Couldn't activate discount :("));
  }

  return (
    <>
      {state && (
        <>
          <button
            onClick={() =>
              addToCard(state.cart.id, state.cart.version, '59d63e92-3aa2-4417-bcab-188e60d2f0c6')
            }
          >
            Add to cart 1
          </button>
          <button
            onClick={() =>
              addToCard(state.cart.id, state.cart.version, '3505286d-7f25-41c5-a4a4-709ea99ea03e')
            }
          >
            Add to cart 2
          </button>
        </>
      )}
      {state &&
        (state.cart.lineItems?.length === 0 ? (
          <div className="fs-xl">
            Your cart is empty. You can go to{' '}
            <Link to="/" className="text-sky-300">
              catalog
            </Link>{' '}
            to change it
          </div>
        ) : (
          <>
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="max-[660px]:hidden">Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.lineItems.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-start mt-4">
              <div>
                <form className="mb-2" onSubmit={submitDiscount}>
                  <input
                    type="text"
                    placeholder="Enter discount code"
                    name="discount code"
                    className="p-2 mr-1 border rounded"
                    value={discountCode}
                    onChange={({ target }) => setDiscountCode(target.value)}
                  />
                  <button className="p-2 bg-sky-900 text-white rounded hover:bg-sky-800 transition-colors">
                    Activate discount code
                  </button>
                </form>
                <div className="flex gap-2 items-center">
                  Total price:{' '}
                  {state.cart.discountOnTotalPrice ? (
                    <div>
                      <span>{formatPrice(state.cart.totalPrice)}</span>
                      <span className="opacity-50 line-through">
                        {' '}
                        {formatPrice({
                          ...state.cart.totalPrice,
                          centAmount:
                            state.cart.totalPrice.centAmount +
                            state.cart.discountOnTotalPrice.discountedAmount.centAmount,
                        })}
                      </span>
                    </div>
                  ) : (
                    formatPrice(state.cart.totalPrice)
                  )}
                  <button className="p-2 bg-sky-900 text-white rounded hover:bg-sky-800 transition-colors">
                    Buy
                  </button>
                </div>
              </div>
              <button
                className="p-2 bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
                type="button"
                onClick={() => setIsClearing(true)}
              >
                Clear cart
              </button>
            </div>
          </>
        ))}
      {state && (
        <button onClick={() => deactivateCode(state?.cart.id, state?.cart.version)}>remove</button>
      )}

      {state && isClearing && (
        <div className="absolute inset-0 z-50">
          <div className="absolute inset-0 bg-black opacity-50">
            <button className="absolute inset-0" onClick={() => setIsClearing(false)}></button>
          </div>
          <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-sky-100 rounded">
            <div className="fs-l mb-3">Do you want to clear your cart?</div>
            <div className="flex justify-around">
              <button
                className="p-2 bg-sky-900 text-white rounded hover:bg-sky-800 transition-colors"
                onClick={() => setIsClearing(false)}
              >
                No
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
                // onClick={() => clearCart(state.cart)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default BasketPage;
