import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import getDiscountByCategories from '../scripts/helpers/getDiscountByCategories';
import getDiscountedPrice from '../scripts/helpers/getDiscountedPrice';
import formatPrice from '../scripts/helpers/formatPrice';

// interfaces doesn't import for no reason
// maybe something wrong with my pc
// if it can work with ordinary imports use them instead
import * as commercetools from '@commercetools/platform-sdk';
type ProductData = commercetools.ProductData;
type Category = commercetools.Category;
type Money = commercetools.Money;

interface Props {
  data: ProductData;
  categories: Category[];
}

interface DiscountedPrice {
  newPrice: Money;
  discount: string;
}

function ProductInfo({ data, categories }: Props) {
  const [discountedPrice, setDiscountedPrice] = useState<DiscountedPrice | null>(null);
  const variant = data.masterVariant;
  const author = variant.attributes!.find((attr) => attr.name === 'book-author')!.value;
  const weight = variant.attributes!.find((attr) => attr.name === 'book-weight')!.value;
  const categoriesTexts = categories.map((cat) => cat.name['en-US']);

  const price = variant.prices![0];

  useEffect(() => {
    getDiscountByCategories(categories).then((res) => {
      if (!res) return;
      setDiscountedPrice(getDiscountedPrice(res, price));
    });
  }, [categories, price]);

  return (
    <>
      <h2 className="fs-l">by {author}</h2>
      <h1 className="fs-xxl p-0 m-0">{data.name['en-US']}</h1>

      <div className="fs-xl relative inline-block">
        {discountedPrice ? (
          <>
            <span>{formatPrice(discountedPrice.newPrice)}</span>{' '}
            <span className="line-through opacity-50">{formatPrice(price.value)}</span>
            <span className="fs-m absolute top-0 right-0 translate-x-full">
              -{discountedPrice.discount}
            </span>
          </>
        ) : (
          <span>{formatPrice(price.value)}</span>
        )}
      </div>
      <button className="text-white bg-black p-2 mt-3 mb-3 rounded flex items-center gap-1">
        <ShoppingCartIcon className="size-5" /> Add to cart
      </button>

      <ul>
        <li>
          <span className="font-bold">Categories: </span>
          {categoriesTexts.join(', ')}
        </li>
        <li>
          <span className="font-bold">Weight: </span>
          {weight}kgs
        </li>
      </ul>

      <div className="fs-l mt-5">Description:</div>
      <p>{data.description!['en-US']}</p>
    </>
  );
}

export default ProductInfo;
