import AsyncStorage from '@react-native-community/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { createLoginSlice, ILoginSlice } from './createLoginSlice';
import { createThemeSlice, IThemeSlice } from './createThemeSlice';
import { createStoresSlice, IStoreSlice } from './createStoresSlice';

interface IStore extends ILoginSlice, IThemeSlice, IStoreSlice {}

/**
 * Make sure to enforce type for each slice
 */

export const useStore = create<IStore>()(
  persist(
    (set, get, api) => ({
      ...createLoginSlice(set, get, api),
      ...createThemeSlice(set, get, api),
      ...createStoresSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
