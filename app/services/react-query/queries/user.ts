import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ApiService } from 'app/services/ApiService';
// import { useStore } from 'app/store';

/**
 *
 * @returns Deals with my request details api
 * Caching handled by react query
 */

export const GetStoresList = () => {
  const staffRequestService = ApiService.createInstance();
  // const userId = useStore(state => state.userId);

  return useQuery(['StoresDetails'], async () => {
    const response: AxiosResponse = await staffRequestService.getStores();
    return response.data;
  });
};
