import { RequestLoadingStatusType } from './RequestLoadingStatusType';

export interface BasicDispatchInterface<Entity> {
  lastRequest: null | number;
  params: any;
  loadingStatus: RequestLoadingStatusType;
  error: string;
  ids: string | number[];
  entities: {
    [key: string]: Entity;
  };
}
