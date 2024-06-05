// import Header from '../components/Header';
import { MotionConfig, motion } from 'framer-motion';
import About from '../pages/about/About';
import { useEffect, useState } from 'react';
import { getProducts } from '../scripts/api/client';
// import { PageNames } from '../scripts/constants/enums';
import getPrice from '../scripts/helpers/getPrice';
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
          <About />
          {/* temporary code to use product page */}
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
          {/* <Header navPages={[PageNames.login, PageNames.register]} /> */}
        </motion.div>
      </MotionConfig>
    </>
  );
}
