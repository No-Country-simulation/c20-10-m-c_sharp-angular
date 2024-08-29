export interface IAuthLogin {
  email: string;
  password: string;
}

export interface ILoginErrorResponse {
  type:   string;
  title:  string;
  status: number;
  detail: string;
}

export interface ILoginOkResponse {
  tokenType:    string;
  accessToken:  string;
  expiresIn:    number;
  refreshToken: string;
}
