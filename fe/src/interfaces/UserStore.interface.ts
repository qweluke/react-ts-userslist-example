import { BasicDispatchInterface } from './BasicDispatchInterface';
import { UserInterface } from './User.interface';

export interface UsersStoreInterface
  extends BasicDispatchInterface<UserInterface> {
  totalRows: number;
}
