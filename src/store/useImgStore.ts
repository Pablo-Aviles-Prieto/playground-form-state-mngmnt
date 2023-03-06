import { create } from 'zustand';
import { IUnsplashImgObj } from '../interfaces';

interface IImgStore {
  images: IUnsplashImgObj[];
  addImages: (newImgs: IUnsplashImgObj[]) => void;
}

const useImgStore = create<IImgStore>()((set) => ({
  images: [],
  addImages: (newImgs) =>
    set((state) => ({ images: [...state.images, ...newImgs] })),
}));
