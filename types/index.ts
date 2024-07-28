export type User = {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
};

export type AddressType = 'home' | 'vacation' | 'other';

export type UserAddress = {
  id?: number;
  type?: AddressType;
  country: string;
  postalCode: number;
  city: string;
  street: string;
  houseNumber: string;
};
