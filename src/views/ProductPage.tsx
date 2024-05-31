import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory, getProduct } from '../scripts/api/client';
import ProductInfo from '../components/PdoductInfo';

// interfaces doesn't import for no reason
// maybe something wrong with my pc
// if it can work with ordinary imports use them instead
import * as commercetools from '@commercetools/platform-sdk';
type ProductData = commercetools.ProductData;
type Category = commercetools.Category;

function ProductPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
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
        ).then((res) => setCategories(res.map((cat) => cat.body)));
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex gap-10 mt-4">
      <div className="slider w-1/3">
        {data.masterVariant.images?.map((image) => <img key={image.url} src={image.url} alt="" />)}
      </div>
      <div className="content">
        <ProductInfo data={data} categories={categories} />
      </div>
    </div>
  );
}

export default ProductPage;
