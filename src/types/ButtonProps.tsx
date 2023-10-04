import { MouseEvent, KeyboardEvent } from "react";

export type ButtonProps = {
  onclick: (event: MouseEvent<HTMLButtonElement>) => void;
  content: string;
  icon: string;
};

export type OthersProps = {
  Type?: "button" | "submit" | "reset" | undefined
  flag?: string; 
  onclick: (event: MouseEvent<HTMLButtonElement>) => void;
  content: string;
  onkeydown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
};
