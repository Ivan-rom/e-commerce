import * as commercetools from '@commercetools/platform-sdk';
import formatPrice from '../scripts/helpers/formatPrice';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../scripts/hooks/storeHooks';
import { changeItemQuantityAction, removeItemAction } from '../store/actions/cartActions';
type LineItem = commercetools.LineItem;

type Props = {
  item: LineItem;
};

function CartItem({ item }: Props) {
  const state = useAppSelector((state) => state.cart)!;
  const dispatch = useAppDispatch();
  function changeQuantity(quantity: 1 | -1) {
    dispatch(changeItemQuantityAction(state, item.id, item.quantity + quantity));
  }

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
          <button
            className="border p-2 hover:bg-sky-300 hover:text-white transition-all"
            onClick={() => changeQuantity(-1)}
          >
            -
          </button>
          <div className="border border-x-0 p-2">{item.quantity}</div>
          <button
            className="border p-2 hover:bg-sky-300 hover:text-white transition-all"
            onClick={() => changeQuantity(1)}
          >
            +
          </button>
        </div>
      </td>
      <td>{formatPrice(item.totalPrice)}</td>
      <td>
        <button
          className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded transition-all"
          onClick={() => dispatch(removeItemAction(state, item.id))}
        >
          <TrashIcon className="size-5" />
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
