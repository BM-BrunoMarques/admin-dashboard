export enum FormField {
  EMAIL = "email",
  PASSWORD = "password",
}

export enum ApiErrors {
  EMAIL = "email",
  PASSWORD = "password",
}

export interface AuthErrorObject {
  field: FormField;
  result: boolean;
  message: string;
}

interface AuthOkObject {
  result: true;
}

export type ValidationResponse = AuthErrorObject | AuthOkObject;
