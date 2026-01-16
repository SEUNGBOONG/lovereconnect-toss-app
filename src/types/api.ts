export interface ApiResponse<T> {
  success: boolean | number;
  code: string;
  message: string;
  data: T;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}
