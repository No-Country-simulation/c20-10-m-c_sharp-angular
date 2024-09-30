interface Auth {
  name?: string;
  email: string;
  password: string;
}

export type AuthLogin = Omit<Auth, 'name'>;
export type AuthRegister = Auth;

export interface AuthLoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface AuthRegisterResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors: RegisterErrors;
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface RegisterErrors {
  additionalProp1: string[];
  additionalProp2: string[];
  additionalProp3: string[];
}

export type RefreshTokenResponse = AuthLoginResponse;

export interface ForgotPassword {
  email: string;
  resetCode: string;
  newPassword: string;
}
export type ForgotPasswordResponse = AuthRegisterResponse;
