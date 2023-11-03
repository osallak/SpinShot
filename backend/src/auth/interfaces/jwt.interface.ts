export interface JwtAuthPayload {
  username: string;
  sub: string;
  iss?: string;
  iat?: number;
  exp?: number;

  isTwoFactorEnabled?: boolean;
  isTwoFaAuthenticated?: boolean;
}
