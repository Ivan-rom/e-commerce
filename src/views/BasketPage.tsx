import { useEffect, useState } from 'react';
import { addToCard, createCart, getCart } from '../scripts/api/client';
import * as commercetools from '@commercetools/platform-sdk';
import CartItem from '../components/CartItem';
type Cart = commercetools.Cart;

function BasketPage() {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem('e-com-user')!);

    getCart(user.id)
      .then((res) => setCart(res.body))
      .catch(() => createCart(user.id).then((res) => setCart(res.body)));
  }, []);

  return (
    <>
      <h1>Basket page</h1>
      {cart && (
        <button
          onClick={() => addToCard(cart.id, cart.version, '3505286d-7f25-41c5-a4a4-709ea99ea03e')}
        >
          Add to cart
        </button>
      )}
      {cart && (
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
                <CartItem item={item} key={item.id} cart={cart} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default BasketPage;
