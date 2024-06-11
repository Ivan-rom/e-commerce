import * as commercetools from '@commercetools/platform-sdk';
type CategoryWithChildren = commercetools.Category & { children?: CategoryWithChildren[] };

type Props = {
  category: CategoryWithChildren;
  changeCategory: (id: string) => void;
  currentCategory: string;
};

function CategoryItem({ category, changeCategory, currentCategory }: Props) {
  return (
    <li className="w-full">
      <button
        className={`w-full text-left hover:text-sky-400 ${currentCategory === category.id ? 'text-sky-500' : ''}`}
        onClick={() => changeCategory(category.id)}
      >
        {category.name['en-US']}
      </button>
      {category.children && (
        <ul className=" w-11/12 ml-auto">
          {category.children.map((cat) => (
            <CategoryItem
              changeCategory={changeCategory}
              category={cat}
              currentCategory={currentCategory}
              key={cat.id}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default CategoryItem;
