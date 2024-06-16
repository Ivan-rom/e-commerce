import * as commercetools from '@commercetools/platform-sdk';
import formatPrice from '../scripts/helpers/formatPrice';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { addToCard } from '../scripts/api/client';
// import { useAppDispatch } from '../scripts/hooks/storeHooks';
import { useSelector } from 'react-redux';
import { Cart } from '../scripts/constants/apInterfaces';
// import cart from '../store/reducers/cart';
type Props = {
  product: commercetools.ProductProjection | commercetools.ProductData;
  id: string;
};

function ProductCard({ product, id }: Props) {
  // const dispatch = useAppDispatch();
  const cart = useSelector((state: Cart) => state.cart);
  const add = async () => {
    await addToCard(cart.id, cart.version, id);
    // await addToCard(cardId as string, user.version, id);
  };
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
        <button
          type="submit"
          className="text-white bg-black p-2 mt-3 mb-3 rounded flex items-center gap-1"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            add();
          }}
        >
          <ShoppingCartIcon className="size-5" /> Add to cart
        </button>
      </a>
    </div>
  );
}

export default ProductCard;
