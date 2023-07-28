export type ButtonProps = {
  onclick: () => void;
  content: string;
  icon: string;
};

export type OthersProps = {
    onclick: () => void;
    content: string;
};

export type PasswordProps = {
  onclick: () => void;
  icon: string;
  isState: boolean;
}
