import * as commercetools from '@commercetools/platform-sdk';
import formatPrice from './formatPrice';
type ProductDiscount = commercetools.ProductDiscount;
type Price = commercetools.Price;

export default function getDiscountedPrice(res: ProductDiscount, price: Price) {
  let centAmount = 0;
  let discount = '';

  if (res.value.type === 'absolute') {
    discount = formatPrice(res.value.money[0]);
    centAmount = price.value.centAmount - res.value.money[0].centAmount;
  } else if (res.value.type === 'relative') {
    discount = `${res.value.permyriad / 100}%`;
    centAmount =
      price.value.centAmount - (price.value.centAmount / 100) * (res.value.permyriad / 100);
  }

  const newPrice = {
    currencyCode: price.value.currencyCode,
    centAmount,
  };

  return {
    discount,
    newPrice,
  };
}
