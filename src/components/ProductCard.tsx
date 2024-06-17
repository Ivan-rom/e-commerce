import * as commercetools from '@commercetools/platform-sdk';
import formatPrice from '../scripts/helpers/formatPrice';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import {
  addToCartAction,
  changeItemQuantityAction,
  removeItemAction,
} from '../store/actions/cartActions';
import { useAppDispatch } from '../scripts/hooks/storeHooks';
import { useSelector } from 'react-redux';
import { Cart } from '../scripts/constants/apInterfaces';
// import cart from '../store/reducers/cart';
type Props = {
  product: commercetools.ProductProjection | commercetools.ProductData;
  id: string;
};

function ProductCard({ product, id }: Props) {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: Cart) => state.cart);
  const add = async () => {
    dispatch(addToCartAction(cart.id, cart.version, id));
    // await addToCard(cardId as string, user.version, id);
  };

  const productInCart = cart.lineItems!.find((item) => item.productId === id);

  function changeQuantity(quantity: 1 | -1) {
    const itemQuantity = cart.lineItems!.find((item) => item.productId === id)?.quantity || 0;
    if (itemQuantity + quantity) {
      dispatch(
        changeItemQuantityAction(cart, productInCart?.id as string, itemQuantity + quantity),
      );
    } else {
      dispatch(removeItemAction(cart, productInCart?.id as string));
    }
  }
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
        {productInCart && (
          <div className="flex justify-center">
            <button
              className="border p-2 hover:bg-sky-300 hover:text-white transition-all"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                changeQuantity(-1);
              }}
            >
              -
            </button>
            <div className="border border-x-0 p-2">{productInCart?.quantity}</div>
            <button
              className="border p-2 hover:bg-sky-300 hover:text-white transition-all"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                changeQuantity(1);
              }}
            >
              +
            </button>
          </div>
        )}
        {!productInCart && (
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
        )}
      </a>
    </div>
  );
}

export default ProductCard;
