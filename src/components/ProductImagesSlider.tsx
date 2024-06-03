import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
// interfaces doesn't import for no reason
// maybe something wrong with my pc
// if it can work with ordinary imports use them instead
import * as commercetools from '@commercetools/platform-sdk';
type Image = commercetools.Image;

type Props = {
  images: Image[];
};

function ProductImagesSlider({ images }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullMode, setIsFullMode] = useState(false);

  const previousSlide = () => {
    if (activeImageIndex === 0) setActiveImageIndex(images.length - 1);
    else setActiveImageIndex(activeImageIndex - 1);
  };

  const nextSlide = () => {
    if (activeImageIndex === images.length - 1) setActiveImageIndex(0);
    else setActiveImageIndex(activeImageIndex + 1);
  };

  const changeSlide = (index: number) => {
    setActiveImageIndex(index);
  };

  const changeMode = () => {
    setIsFullMode(!isFullMode);
  };

  return (
    <div className={`${isFullMode ? 'absolute inset-0' : 'relative'}`}>
      <div className={`flex justify-center items-center gap-5 h-4/5`}>
        {images.length !== 1 && (
          <button onClick={nextSlide} className="relative z-10">
            <ArrowLongLeftIcon className="bg-sky-50 p-1 rounded-xl size-7 text-slate-600" />
          </button>
        )}
        <div className={`overflow-hidden relative z-10`}>
          <div
            className={`flex h-full w-full items-center ease-in-out duration-100 `}
            style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
          >
            {images.map((image) => (
              <button
                className={`w-full shrink-0 flex items-center justify-center`}
                key={image.url}
                onClick={changeMode}
              >
                <img
                  className={`${isFullMode ? 'h-[70vh] w-full' : 'w-[200px]'} object-contain`}
                  src={image.url}
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>
        {images.length !== 1 && (
          <button onClick={previousSlide} className="relative z-10">
            <ArrowLongRightIcon className="bg-sky-50 p-1 rounded-xl size-7 text-slate-600" />
          </button>
        )}
      </div>
      <div
        className={`justify-center items-center w-full flex gap-5 h-1/5 relative z-10 ${!isFullMode && 'mt-3'}`}
      >
        {images.map((image, i) => (
          <button
            key={image.url}
            onClick={() => changeSlide(i)}
            className={`w-12 ${i === activeImageIndex && 'outline outline-1 outline-offset-1'}`}
          >
            <img src={image.url} alt="" />
          </button>
        ))}
      </div>
      {isFullMode && (
        <button
          onClick={changeMode}
          className="backdrop absolute inset-0 bg-slate-700 opacity-50"
        ></button>
      )}
    </div>
  );
}

export default ProductImagesSlider;
