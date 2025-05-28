export class ErrorResponseDto {  
  errorCode?: string;
  userMessage: string[];
  technicalCode?: string;
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
  statusCode: number;

  constructor(data?: T, error?: ErrorResponseDto, statusCode = 200) {
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
  }

  static ok<T>(data: T, statusCode: number = 200): ApiResult<T> {
    return new ApiResult<T>(data, undefined, statusCode);
  }

  static fail<T>(
    error: ErrorResponseDto,
    statusCode: number = 400,
  ): ApiResult<T> {
    return new ApiResult<T>(undefined, error, statusCode);
  }
}
