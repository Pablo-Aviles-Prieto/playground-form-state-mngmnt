import { FC, useEffect, useState } from 'react';
import { preload } from 'swr';
import { useFetchUnsplash, unsplashFetcher } from '../utils/useFetchUnsplash';
import { useImgStore } from '../store/useImgStore';
import { IUnsplashImgObj } from '../interfaces';

interface IFetchUnsplash {
  total: number;
  total_pages: number;
  results: IUnsplashImgObj[];
}

export const UnsplashImgs: FC = () => {
  const [unsplashPage, setUnsplashPage] = useState(1);
  const { images, addImages } = useImgStore();

  useFetchUnsplash(
    `https://api.unsplash.com/search/photos?query=fire&page=${unsplashPage}`,
    {
      onSuccess: (data: IFetchUnsplash) => {
        addImages(data.results);
      },
    }
  );

  useEffect(() => {
    preload(
      `https://api.unsplash.com/search/photos?query=fire&page=${
        unsplashPage + 1
      }`,
      unsplashFetcher
    );
  }, [unsplashPage]);

  return (
    <>
      <h1>Unsplash fire imgs from zustand store and SWR preloading them</h1>
      <div className='imgs-container'>
        {images.map((img) => (
          <img
            className='imgs-unsplash'
            key={img.id}
            src={img.urls.small}
            alt={img.description || 'unsplash photo'}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setUnsplashPage((prevState) => prevState + 1);
        }}
      >
        Load more imgs
      </button>
    </>
  );
};
