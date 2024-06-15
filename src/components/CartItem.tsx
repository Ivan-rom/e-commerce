import * as commercetools from '@commercetools/platform-sdk';
import formatPrice from '../scripts/helpers/formatPrice';
import { removeFromCart } from '../scripts/api/client';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
type Cart = commercetools.Cart;
type LineItem = commercetools.LineItem;

type Props = {
  item: LineItem;
  cart: Cart;
  updateCart: (cart: Cart) => void;
};

function CartItem({ item, cart, updateCart }: Props) {
  return (
    <tr className="border">
      <td className="max-[660px]:hidden">
        <div className="flex justify-center">
          <img className="w-24 p-3" src={item.variant.images![0].url} alt="" />
        </div>
      </td>
      <td>
        <Link to={`/product/${item.productId}`}>{item.name['en-US']}</Link>
      </td>
      <td>
        <div className="flex gap-1 justify-center">
          {item.price?.discounted ? (
            <>
              <div>{formatPrice(item.price.discounted.value)} </div>
              <div className="line-through opacity-50 max-[660px]:hidden">
                {formatPrice(item.price.value)}
              </div>
            </>
          ) : (
            <>{formatPrice(item.variant.prices![0].value)}</>
          )}
        </div>
      </td>
      <td>
        <div className="flex justify-center">
          <button className="border p-2 hover:bg-sky-300 hover:text-white transition-all">-</button>
          <div className="border border-x-0 p-2">{item.quantity}</div>
          <button className="border p-2 hover:bg-sky-300 hover:text-white transition-all">+</button>
        </div>
      </td>
      <td>{formatPrice(item.totalPrice)}</td>
      <td>
        <button
          className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded transition-all"
          onClick={() =>
            removeFromCart(cart.id, cart.version, item.id).then((res) => updateCart(res.body))
          }
        >
          <TrashIcon className="size-5" />
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
