export enum UserType {
  ADMIN = 9,
  USER = 1,
}

export interface UserState {
  authentication: {
    id: number;
    type: UserType;
    email: string;
    password: string;
  };
  info: {
    name: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface OrderState {
  id: number;
  name: string;
  date: string;
  address: string;
  country: {
    name: string;
    code: string;
  };
  total: string;
  status: string;
}

export type UserOrderState = UserState[] | OrderState[];

export interface OrderStateObj {
  orders: OrderState[];
}

export interface UsersStateObj {
  users: UserState[];
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
