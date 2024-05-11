export interface ValidationError {
  message: string[] | string;
  error: string;
  statusCode: number;
}

export interface ResponseError {
  response: string;
  message: string[];
}

export interface ResponseSuccess<T> {
  status: string;
  data: T;
}
