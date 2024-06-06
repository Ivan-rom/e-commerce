import { useEffect, useState } from 'react';
import { getProducts } from '../scripts/api/client';

// interfaces doesn't import for no reason
// maybe something wrong with my pc
// if it can work with ordinary imports use them instead
import * as commercetools from '@commercetools/platform-sdk';
import getPrice from '../scripts/helpers/getPrice';
type Product = commercetools.Product;

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getProducts()
      .then((response) => setProducts(response.body.results))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fs-xxl">Loading...</div>
      ) : isError ? (
        <div className="fs-xxl">Something went wrong :(</div>
      ) : (
        <div className="grid grid-cols-3 gap-3 m-auto w-9/12">
          {products.map(
            (product, index) =>
              product.masterData.published && (
                <div key={index} className="w-full">
                  <div>
                    <a key={product.id} href={`product/${product.id}`}>
                      <img
                        className="h-60 object-cover m-auto"
                        src={product.masterData.current.masterVariant.images![0].url}
                        alt={`${product.masterData.current.name['en-US']} cover`}
                      />
                      <p className="italic text-xs">
                        {getPrice(product.masterData.current.masterVariant)}$
                      </p>

                      <p className="font-bold">{product.masterData.current.name['en-US']}</p>
                    </a>
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </>
  );
}

export default Catalog;
