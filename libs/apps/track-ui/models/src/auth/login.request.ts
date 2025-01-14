export interface LoginRequest {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  two_factor: boolean;
}
