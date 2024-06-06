import { useEffect, useState } from 'react';
import { getProductsByCategory, getProducts } from '../scripts/api/client';
import ProductCard from './ProductCard';

// interfaces doesn't import for no reason
// maybe something wrong with my pc
// if it can work with ordinary imports use them instead
import * as commercetools from '@commercetools/platform-sdk';
import CategoryList from './CategoryList';
import Pagination from './Pagination';
type Product = commercetools.ProductProjection;

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const pagesPerPage = 10;
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const categories =
      currentCategory === ''
        ? getProducts(currentPage * pagesPerPage, pagesPerPage)
        : getProductsByCategory(currentCategory);
    categories
      .then((response) => {
        setPages(response.body.total ? Math.floor(response.body.total / pagesPerPage) : 1);
        setProducts(response.body.results);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [currentCategory, currentPage]);

  const changeCategory = (id: string) => {
    setCurrentCategory(id);
  };

  return (
    <>
      {isLoading ? (
        <div className="fs-xxl">Loading...</div>
      ) : isError ? (
        <div className="fs-xxl">Something went wrong :(</div>
      ) : (
        <>
          <div className="flex">
            <div className="w-3/12">
              <CategoryList currentCategory={currentCategory} changeCategory={changeCategory} />
            </div>
            <div className="grid grid-cols-2 gap-3 m-auto w-9/12">
              {products.map((product) => (
                <ProductCard product={product} id={product.id} key={product.id} />
              ))}
            </div>
          </div>
          <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}
    </>
  );
}

export default Catalog;
