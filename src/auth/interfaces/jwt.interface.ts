export interface JwtAuthPayload {
  username: string;
  sub: string;
  iss?: string;
  iat?: number;
  exp?: number;
}