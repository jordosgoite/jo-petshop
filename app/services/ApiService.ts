import axios, { AxiosRequestConfig } from 'axios';
import { apiClientPets } from './client';

export class ApiService {
  config?: AxiosRequestConfig = {};

  private cancellationToken = axios.CancelToken.source();

  static createInstance(): ApiService {
    const activeInstance = new ApiService();
    activeInstance.cancellationToken = axios.CancelToken.source();
    activeInstance.config.cancelToken = activeInstance.cancellationToken.token;
    return activeInstance;
  }

  cancelRequests() {
    this.cancellationToken.cancel('RequestCancellation');
    return ApiService.createInstance();
  }

  getStores = () => {
    return apiClientPets.get('/stores');
  };
  resetStores = () => {
    return apiClientPets.post('/stores/reset');
  };
  postCheckin = (data: { taskId: number; storeId: number }) => {
    return apiClientPets.post('/checkin', { data });
  };
}
