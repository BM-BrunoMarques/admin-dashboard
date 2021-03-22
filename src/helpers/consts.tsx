export enum UserType {
  ADMIN = 9,
  USER = 1,
}

interface Name {
  firstName: string;
  lastName: string;
}

export interface UserState {
  id: number;
  authentication: {
    type: UserType;
    password: string;
    email: string;
  };
  info?: {
    name?: Name;
  };
}
