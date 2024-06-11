import * as commercetools from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { getCategories } from '../scripts/api/client';
import CategoryItem from './CategoryItem';
type CategoryWithChildren = commercetools.Category & { children?: CategoryWithChildren[] };

type Props = {
  changeCategory: (id: string) => void;
  currentCategory: string;
};

function CategoryList({ changeCategory, currentCategory }: Props) {
  const [categories, setCategories] = useState<(CategoryWithChildren | undefined)[]>([]);

  useEffect(() => {
    getCategories().then((res) => {
      const categories = res.body.results as CategoryWithChildren[];
      const categoriesWithChildren = categories.map((cat) => {
        if (!cat.parent) return cat;

        const parent = categories.find((parent) => parent.id === cat.parent?.id);
        parent!.children = parent!.children ? [...parent!.children, cat] : [cat];
        return;
      });
      setCategories(categoriesWithChildren.filter((cat) => cat !== undefined));
    });
  }, []);

  return (
    <>
      <ul>
        <li>
          <button
            className={`hover:text-sky-400 ${currentCategory === '' ? 'text-sky-500' : ''}`}
            onClick={() => changeCategory('')}
          >
            All
          </button>
        </li>
        {categories &&
          categories.map(
            (cat) =>
              cat && (
                <CategoryItem
                  currentCategory={currentCategory}
                  changeCategory={changeCategory}
                  category={cat}
                  key={cat.id}
                />
              ),
          )}
      </ul>
    </>
  );
}

export default CategoryList;
