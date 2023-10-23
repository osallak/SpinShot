import Image from "next/image";
import eye from "../../../../public/eye.svg";
import eyeSlash from "../../../../public/eye-slash.svg";
import { MouseEvent } from "react";
const PasswordButton = ({
  ShowPassword,
  setShowPassword,
}: {
  ShowPassword: boolean;
  setShowPassword: Function;
}) => {
  const ShowHidePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!ShowPassword);
  };
  return (
    <button
      className="right-1 w-9 h-9 flex justify-center items-center outline-none "
      onClick={(event) => ShowHidePassword(event)}
    >
      {ShowPassword ? (
        <Image src={eye} alt="hide and show password" />
      ) : (
        <Image src={eyeSlash} alt="hide and show password" />
      )}
    </button>
  );
};

export default PasswordButton;
