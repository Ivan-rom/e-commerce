import * as commercetools from '@commercetools/platform-sdk';
type ProductData = commercetools.ProductVariant;

export default function getPrice(variant: ProductData) {
  return (
    variant.prices![0].value.centAmount /
    10 ** variant.prices![0].value.fractionDigits
  ).toFixed(variant.prices![0].value.fractionDigits);
}
