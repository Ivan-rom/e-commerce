import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

type Props = {
  pages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

function Pagination({ pages, currentPage, setCurrentPage }: Props) {
  return (
    <div className="flex gap-2 w-full justify-center items-center mt-5">
      <button
        className={currentPage === 0 ? '' : 'hover:text-sky-500'}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ArrowLeftIcon className="size-6" />
      </button>
      <div>
        {currentPage + 1}/{pages + 1}
      </div>
      <button
        className={currentPage === pages ? '' : 'hover:text-sky-500'}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages}
      >
        <ArrowRightIcon className="size-6" />
      </button>
    </div>
  );
}

export default Pagination;
