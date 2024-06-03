// import Header from '../components/Header';
import { MotionConfig, motion } from 'framer-motion';
import About from '../pages/about/About';
import { useEffect, useState } from 'react';
import { getProducts } from '../scripts/api/client';
// import { PageNames } from '../scripts/constants/enums';

// interfaces doesn't import for no reason
// maybe something wrong with my pc
// if it can work with ordinary imports use them instead
import * as commercetools from '@commercetools/platform-sdk';
type Product = commercetools.Product;

export default function Main() {
  // temporary code to use product page
  const [products, setProducts] = useState([] as Product[]);
  useEffect(() => {
    getProducts().then((response) => setProducts(response.body.results));
  }, []);

  return (
    <>
      <MotionConfig transition={{ duration: 1 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* <Header navPages={[PageNames.login, PageNames.register]} /> */}
          <About />
        </motion.div>
      </MotionConfig>

      {/* temporary code to use product page */}
      {products.map(
        (product) =>
          product.masterData.published && (
            <a key={product.id} href={`product/${product.id}`}>
              {product.masterData.current.name['en-US']},
            </a>
          ),
      )}
    </>
  );
}
