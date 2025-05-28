export class ErrorResponseDto {
  statusCode: number;
  errorCode?: string;
  userMessage: string[];
  technicalMessage?: string;
  details?: any;
  timestamp: string;
  path?: string;

   constructor(init?: Partial<ErrorResponseDto>) {
    this.timestamp = new Date().toISOString();
    Object.assign(this, init);
  }
}

export class ApiResult<T> {
  data?: T;
  error?: ErrorResponseDto;

  constructor(data?: T, error?: ErrorResponseDto) {
    this.data = data;
    this.error = error;
  }

  static ok<T>(data: T): ApiResult<T> {
    return new ApiResult<T>(data);
  }

  static fail<T>(error: ErrorResponseDto): ApiResult<T> {
    return new ApiResult<T>(undefined, error);
  }
}
