import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ApiService } from 'app/services/ApiService';

/**
 *
 * @returns Deals with my request details api
 * Caching handled by react query
 */

export const GetStoresList = () => {
  const staffRequestService = ApiService.createInstance();
  return useQuery(['StoresDetails'], async () => {
    const response: AxiosResponse = await staffRequestService.getStores();
    return response.data;
  });
};

export const PostStoreCheckin = (data: { taskId: number; storeId: number }) => {
  const staffRequestService = ApiService.createInstance();
  return useMutation(['StoresCheckin'], async () => {
    const response: AxiosResponse = await staffRequestService.postCheckin(data);
    return response.data;
  });
};
