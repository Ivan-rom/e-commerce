import * as commercetools from '@commercetools/platform-sdk';
import formatPrice from '../scripts/helpers/formatPrice';
import { useEffect, useState } from 'react';
import getDiscountedPrice from '../scripts/helpers/getDiscountedPrice';
import getDiscountByCategories from '../scripts/helpers/getDiscountByCategories';
import { getCategory } from '../scripts/api/client';
type Money = commercetools.Money;

type Props = {
  product: commercetools.ProductProjection | commercetools.ProductData;
  id: string;
};

interface DiscountedPrice {
  newPrice: Money;
  discount: string;
}

function ProductCard({ product, id }: Props) {
  const [discountedPrice, setDiscountedPrice] = useState<DiscountedPrice | null>(null);
  const price = product.masterVariant.prices![0];

  useEffect(() => {
    Promise.all(product.categories.map((cat) => getCategory(cat.id)))
      .then((res) => getDiscountByCategories(res))
      .then((res) => {
        if (!res) return;
        setDiscountedPrice(getDiscountedPrice(res, price));
      });
  }, [product, price]);

  return (
    <div className="w-full p-1 rounded-sm hover:shadow">
      <a key={id} href={`product/${id}`}>
        <img
          className="h-60 object-cover m-auto"
          src={product.masterVariant.images![0].url}
          alt={`${product.name['en-US']} cover`}
        />
        <p className="italic text-xs">
          {discountedPrice ? (
            <>
              {' '}
              <span>{formatPrice(discountedPrice.newPrice)}</span>{' '}
              <span className="line-through opacity-50">{formatPrice(price.value)}</span>
            </>
          ) : (
            <>{formatPrice(product.masterVariant.prices![0].value)}</>
          )}
        </p>

        <p className="font-bold">{product.name['en-US']}</p>
      </a>
    </div>
  );
}

export default ProductCard;
