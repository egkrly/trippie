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

export type Airport = {
  id?: number;
  code: string;
  name: string;
  cityCode: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  timezone: number;
  lat: string;
  lon: string;
  numAirports: number;
  city: boolean;
  searchCount: number;
};
