import * as commercetools from '@commercetools/platform-sdk';
import formatPrice from '../scripts/helpers/formatPrice';
type LineItem = commercetools.LineItem;

type Props = {
  item: LineItem;
};

function CartItem({ item }: Props) {
  console.log(item);
  return (
    <li className="flex gap-1 items-center">
      <img src={item.variant.images![0].url} alt="" className=" w-14" />
      <div>{item.name['en-US']}</div>
      <div>{formatPrice(item.variant.prices![0].value)}</div>
      <div>{item.quantity}</div>
      <div>{formatPrice(item.totalPrice)}</div>
      <div>{item.variant.sku}</div>
    </li>
  );
}

export default CartItem;
