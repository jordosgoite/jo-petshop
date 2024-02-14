export interface MyScreenParams {
  StoreId: string;
}
export interface MyDataParams {
  id: string;
  name: string;
  address: { direction: string; coordinate: { lat: string; lng: string } };
  tasks: [{ id: string; description: string; assigned: boolean }];
  shipping_methods: [{ description: string; id: string; name: string }];
}
