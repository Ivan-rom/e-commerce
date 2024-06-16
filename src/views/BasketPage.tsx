import { useState } from 'react';
import { addToCard, removeFromCart } from '../scripts/api/client';
import { Cart, CartState } from '../scripts/constants/apInterfaces';
import CartItem from '../components/CartItem';
// import { Link } from 'react-router-dom';
import formatPrice from '../scripts/helpers/formatPrice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function BasketPage() {
  const cart = useSelector((state: Cart) => state.cart);
  // const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  // const [discountCode, setDiscountCode] = useState('');

  // useEffect(() => {
  //   const { user } = JSON.parse(localStorage.getItem('e-com-user')!);

  //   getCart(user.id)
  //     .then((res) => setCart(res.body))
  //     .catch(() => createCart(user.id).then((res) => setCart(res.body)))
  //     .finally(() => setIsLoading(false));
  // }, []);
  function clearCart(cart: CartState) {
    if (cart.lineItems.length === 0) return;

    removeFromCart(cart.id, cart.version, cart.lineItems[0].id)
      .then((newCart) => {
        clearCart(newCart.body);
      })
      .finally(() => setIsClearing(false));
  }

  // function submitDiscount(e: FormEvent) {
  //   e.preventDefault();
  //   activateCode(cart!.id, cart!.version, discountCode)
  //     .then((res) => {
  //       toast.success('Discount activated!');
  //       setCart(res.body);
  //     })
  //     .catch(() => toast.error("Couldn't activate discount :("));
  // }

  return (
    <>
      {cart && (
        <button
          onClick={() => addToCard(cart.id, cart.version, '929b0efd-51d1-4832-9c75-d5b28b4064a0')}
        >
          Add to cart
        </button>
      )}
      {cart && (
        // {/* {isLoading ? (
        //   <div className="fs-xl">Loading...</div>
        // ) : (
        //   cart &&
        //   (cart.lineItems.length === 0 ? (
        //     <div className="fs-xl">
        //       Your cart is empty. You can go to{' '}
        //       <Link to="/" className="text-sky-300">
        //         catalog
        //       </Link>{' '}
        //       to change it
        //     </div>
        //   ) : ( */}
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
              {cart.lineItems.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-start mt-4">
            <div>
              {/* <form className="mb-2" onSubmit={submitDiscount}>
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
            </form> */}
              <div className="flex gap-2 items-center">
                Total price:{' '}
                {cart.discountOnTotalPrice ? (
                  <div>
                    <span>{formatPrice(cart.totalPrice)}</span>
                    <span className="opacity-50 line-through">
                      {' '}
                      {formatPrice({
                        ...cart.totalPrice,
                        centAmount:
                          cart.totalPrice.centAmount +
                          cart.discountOnTotalPrice.discountedAmount.centAmount,
                      })}
                    </span>
                  </div>
                ) : (
                  formatPrice(cart.totalPrice)
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
      )}

      {/* ))
      )} */}

      {cart && isClearing && (
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
                onClick={() => clearCart(cart)}
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
