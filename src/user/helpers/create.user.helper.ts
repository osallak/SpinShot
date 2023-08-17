import * as bcrypt from 'bcrypt';

export function hashPassword(password: string): string | null {
  if (!password) return null;
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function initUserLogs(): any {
  return {
    victories: 0,
    defeats: 0,
    level: 0,
  };
}
