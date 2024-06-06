import { useEffect, useState } from 'react';
import { getProducts } from '../scripts/api/client';
import ProductCard from './ProductCard';

// interfaces doesn't import for no reason
// maybe something wrong with my pc
// if it can work with ordinary imports use them instead
import * as commercetools from '@commercetools/platform-sdk';
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
            (product) =>
              product.masterData.published && <ProductCard product={product} key={product.id} />,
          )}
        </div>
      )}
    </>
  );
}

export default Catalog;
