import { useEffect, useState } from 'react';
import { createCart, getCart } from '../scripts/api/client';
import * as commercetools from '@commercetools/platform-sdk';
import CartItem from '../components/CartItem';
type Cart = commercetools.Cart;

function BasketPage() {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem('e-com-user')!);
    console.log(user.id);

    getCart(user.id)
      .then((res) => setCart(res.body))
      .catch(() => createCart(user.id).then((res) => setCart(res.body)));
  }, []);

  return (
    <>
      <h1>Basket page</h1>
      {cart && (
        <ul>
          {cart.lineItems.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default BasketPage;
