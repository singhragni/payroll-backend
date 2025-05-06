export class ResponseWrapper<T> {
  status: string;
  message: string;
  data: T;
  code: number;
  timestamp: string;

  constructor(
    status: string,
    message: string,
    data: T,
    code: number,
    timestamp: string,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.code = code;
    this.timestamp = timestamp;
  }

  static success<T>(
    message: string,
    data: T,
    code: number,
  ): ResponseWrapper<T> {
    return new ResponseWrapper(
      "success",
      message,
      data,
      code,
      new Date().toISOString(),
    );
  }
}
