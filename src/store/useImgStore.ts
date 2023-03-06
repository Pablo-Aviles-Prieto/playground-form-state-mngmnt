import { create } from 'zustand';
import { IUnsplashImgObj } from '../interfaces';

interface IImgStore {
  images: IUnsplashImgObj[];
  addImages: (newImgs: IUnsplashImgObj[]) => void;
}

export const useImgStore = create<IImgStore>()((set) => ({
  images: [],
  addImages: (newImgs) =>
    set((state) => ({ images: [...state.images, ...newImgs] })),
}));
