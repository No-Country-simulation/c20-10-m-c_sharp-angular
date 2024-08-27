export interface IResponse<T = any> {
  error:    boolean;
  code:     number;
  message:  string;
  data:     T;
  token?:   string;
}
