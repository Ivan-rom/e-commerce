import { FormEvent, useEffect, useState } from 'react';
import {
  activateCode,
  addToCard,
  createCart,
  getCart,
  removeFromCart,
} from '../scripts/api/client';
import * as commercetools from '@commercetools/platform-sdk';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import formatPrice from '../scripts/helpers/formatPrice';
type Cart = commercetools.Cart;

function BasketPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState('');

  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem('e-com-user')!);

    getCart(user.id)
      .then((res) => setCart(res.body))
      .catch(() => createCart(user.id).then((res) => setCart(res.body)))
      .finally(() => setIsLoading(false));
  }, []);

  function clearCart(cart: Cart) {
    if (!cart || cart?.lineItems.length === 0) {
      setCart(cart);
      return;
    }

    removeFromCart(cart.id, cart.version, cart.lineItems[0].id).then((newCart) => {
      clearCart(newCart.body);
    });
  }

  function submitDiscount(e: FormEvent) {
    e.preventDefault();
    activateCode(cart!.id, cart!.version, discountCode).then((res) => setCart(res.body));
  }

  return (
    <>
      {cart && (
        <button
          onClick={() => addToCard(cart.id, cart.version, '929b0efd-51d1-4832-9c75-d5b28b4064a0')}
        >
          Add to cart
        </button>
      )}
      {isLoading ? (
        <div className="fs-xl">Loading...</div>
      ) : (
        cart &&
        (cart.lineItems.length === 0 ? (
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
                {cart.lineItems.map((item) => (
                  <CartItem item={item} key={item.id} cart={cart} updateCart={setCart} />
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-start mt-4">
              <div>
                <form onSubmit={submitDiscount}>
                  <input
                    type="text"
                    placeholder="Enter discount code"
                    name="discount code"
                    className="p-2 mr-1 border"
                    value={discountCode}
                    onChange={({ target }) => setDiscountCode(target.value)}
                  />
                  <button className="p-2 bg-sky-300">Submit</button>
                </form>
                Total price: {formatPrice(cart.totalPrice)}
              </div>
              <button
                className="p-1 bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
                type="button"
                onClick={() => clearCart(cart)}
              >
                Clear cart
              </button>
            </div>
          </>
        ))
      )}
    </>
  );
}

export default BasketPage;
