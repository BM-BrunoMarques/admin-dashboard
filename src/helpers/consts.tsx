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

export interface rowStruct {
  id: string;
  name: string;
  date: string;
  country:string,
  address:string,
  total: number;
  status: string;
}

export interface Markers {
  country: string;
  total: number;
  geoLocation: {
    lat: number;
    long: number;
  };
}
