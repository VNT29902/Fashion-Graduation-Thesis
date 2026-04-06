export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string | null;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
