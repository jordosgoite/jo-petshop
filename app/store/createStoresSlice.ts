import { StateCreator } from 'zustand';

export interface IStoreSlice {
  storeList: [];
  setStoreList: (storeList: []) => void;
}

export const createStoresSlice: StateCreator<IStoreSlice> = set => ({
  storeList: [],
  setStoreList: (storeList): void => {
    set({ storeList });
  },
});
