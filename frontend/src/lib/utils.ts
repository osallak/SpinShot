import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isStringEmptyOrWhitespace(str: string): boolean {
  return str.trim().length === 0;
}