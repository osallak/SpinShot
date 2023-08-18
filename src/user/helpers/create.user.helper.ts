import * as bcrypt from 'bcrypt';
import { CreateLogs } from 'src/types/common.types';

export function hashPassword(password: string): string | null {
  if (!password) return null;
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function initUserLogs(): CreateLogs{
  return {
    victories: 0,
    defeats: 0,
    level: 0,
  };
}
