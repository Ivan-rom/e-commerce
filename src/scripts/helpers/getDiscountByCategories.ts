import * as commercetools from '@commercetools/platform-sdk';
type Category = commercetools.Category;
import { getDiscounts } from '../api/client';

export default async function getDiscountByCategories(categories: Category[]) {
  const discounts = await getDiscounts().then((res) => res.body.results);
  const foundDiscount = discounts
    .filter((dis) => dis.isActive)
    .filter((dis) => dis.references.filter((ref) => ref.typeId === 'category').length > 0)
    .sort((a, b) => +b.sortOrder - +a.sortOrder)
    .find((dis) => !!categories.find((cat) => !!dis.references.find((ref) => ref.id === cat.id)));
  return foundDiscount;
}
