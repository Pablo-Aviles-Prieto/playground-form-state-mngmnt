import { FC, useEffect, useState, Fragment } from 'react';
import { preload } from 'swr';
import { Menu, Transition } from '@headlessui/react';
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

  function DuplicateInactiveIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4 4H12V12H4V4Z'
          fill='#EDE9FE'
          stroke='#A78BFA'
          strokeWidth='2'
        />
        <path
          d='M8 8H16V16H8V8Z'
          fill='#EDE9FE'
          stroke='#A78BFA'
          strokeWidth='2'
        />
      </svg>
    );
  }

  function DuplicateActiveIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4 4H12V12H4V4Z'
          fill='#8B5CF6'
          stroke='#C4B5FD'
          strokeWidth='2'
        />
        <path
          d='M8 8H16V16H8V8Z'
          fill='#8B5CF6'
          stroke='#C4B5FD'
          strokeWidth='2'
        />
      </svg>
    );
  }

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
      <h1 className='my-6 text-4xl font-bold text-center underline'>
        Unsplash fire imgs from zustand store and SWR preloading them
      </h1>
      <div className='grid grid-cols-1 gap-3 mx-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {images.map((img) => (
          <img
            className='object-cover w-full h-full'
            key={img.id}
            src={img.urls.small}
            alt={img.description || 'unsplash photo'}
          />
        ))}
      </div>
      <div className='flex justify-center my-6 align-middle'>
        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='px-6 py-3 transition-all duration-500 border rounded-md shadow-lg text-violet-900 bg-violet-300 border-violet-900 hover:bg-violet-600 hover:scale-105 hover:text-violet-300 hover:shadow-2xl'>
            More Options
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        setUnsplashPage((prevPage) => prevPage + 1)
                      }
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <DuplicateActiveIcon
                          className='w-5 h-5 mr-2'
                          aria-hidden='true'
                        />
                      ) : (
                        <DuplicateInactiveIcon
                          className='w-5 h-5 mr-2'
                          aria-hidden='true'
                        />
                      )}
                      Load more imgs
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};
