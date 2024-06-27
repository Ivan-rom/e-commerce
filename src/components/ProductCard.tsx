import * as commercetools from '@commercetools/platform-sdk';
import formatPrice from '../scripts/helpers/formatPrice';

type Props = {
  product: commercetools.ProductProjection | commercetools.ProductData;
  id: string;
};

function ProductCard({ product, id }: Props) {
  return (
    <div className="w-full p-1 rounded-sm hover:shadow">
      <a key={id} href={`product/${id}`}>
        <img
          className="h-60 object-cover m-auto"
          src={product.masterVariant.images![0].url}
          alt={`${product.name['en-US']} cover`}
        />
        <p className="italic text-xs">
          {product.masterVariant.prices![0].discounted ? (
            <>
              {' '}
              <span>{formatPrice(product.masterVariant.prices![0].discounted.value)}</span>{' '}
              <span className="line-through opacity-50">
                {formatPrice(product.masterVariant.prices![0].value)}
              </span>
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
