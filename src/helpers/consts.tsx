export enum UserType {
  ADMIN = 9,
  USER = 1,
}

interface Name {
  firstName: string;
  lastName: string;
}

export interface UserState {
  authentication: {
    id: number;
    type: UserType;
    password: string;
    email: string;
  };
  info?: {
    name?: Name;
  };
}

export interface OrderState {
  id: number;
  name: string;
  date: string;
  address: string;
  country: string;
  total: number;
  status: string;
}

export interface OrderStateObj {
  orders: OrderState[];
}

export interface Markers {
  country: string;
  total: number;
  geoLocation: {
    lat: number;
    long: number;
  };
}

export type deleteProps = number[];
