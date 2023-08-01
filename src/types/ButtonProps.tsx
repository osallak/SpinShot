import { MouseEvent } from "react";

export type ButtonProps = {
  onclick: (event: MouseEvent<HTMLButtonElement>) => void;
  content: string;
  icon: string;
};

export type OthersProps = {
    onclick: (event: MouseEvent<HTMLButtonElement>) => void;
    content: string;
};
