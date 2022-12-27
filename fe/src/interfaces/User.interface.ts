import { AddressInterface } from './Address.interface';
import { CompanyInterface } from './Company.interface';

export interface UserInterface {
  name: string;
  username: string;
  email: string;
  address: AddressInterface;
  phone: string;
  website: string;
  company: CompanyInterface;
}
