import { AddressInterface } from '../interfaces/Address.interface';

export const formatAddress = (address: AddressInterface): string | null => {
  let lineAddress = null;

  if (address.city) {
    lineAddress = address.city;
  }

  if ((address.suite || address.zipcode) && lineAddress) {
    lineAddress = `${lineAddress},`;
  }

  if (address.suite) {
    if (lineAddress) {
      lineAddress = `${lineAddress} ${address.suite}`;
    } else {
      lineAddress = address.suite;
    }
  }

  if (address.zipcode) {
    if (lineAddress) {
      lineAddress = `${lineAddress} ${address.zipcode}`;
    } else {
      lineAddress = address.zipcode;
    }
  }

  return lineAddress;
};
