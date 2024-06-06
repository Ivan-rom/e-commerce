import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory, getProduct } from '../scripts/api/client';
import ProductInfo from '../components/PdoductInfo';
import ProductImagesSlider from '../components/ProductImagesSlider';
import NotFound from '../pages/notFound/NotFound';

// interfaces doesn't import for no reason
// maybe something wrong with my pc
// if it can work with ordinary imports use them instead
import * as commercetools from '@commercetools/platform-sdk';
type ProductData = commercetools.ProductData;
type Category = commercetools.Category;

function ProductPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({} as ProductData);
  const [categories, setCategories] = useState([] as Category[]);

  useEffect(() => {
    getProduct(id!)
      // getting Product information
      .then((response) => {
        setData(response.body.masterData.current);
        // getting categories for Product
        Promise.all(
          response.body.masterData.current.categories.map((cat) => getCategory(cat.id)),
        ).then((res) =>
          setCategories(res.map((cat) => cat.body).sort((a, b) => +b.orderHint - +a.orderHint)),
        );
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <h1 className="fs-xxl text-center mt-20">Loading...</h1>;

  if (isError)
    return <NotFound text="This product is not found :(" subText="Or it's unavailable" />;

  return (
    <div className="flex gap-10 mt-4">
      <div className="w-1/3">
        <ProductImagesSlider images={data.masterVariant.images!} />
      </div>
      <div className="w-2/3">
        <ProductInfo data={data} categories={categories} />
      </div>
    </div>
  );
}

export default ProductPage;
