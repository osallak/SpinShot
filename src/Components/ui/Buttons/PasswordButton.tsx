import { PasswordProps } from "@/types/ButtonProps";
import { button } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import eye from "../../../../public/eye.svg";
import eyeSlash from "../../../../public/eye-slash.svg";

const PasswordButton = () => {
    const [isState, setState] = useState(false);
    const ShowHidePassword = () => {
        setState((isState) => !isState);
    }
  return (
    <button className="md:w-9 md:h-9 w-5 h-5" onClick={ShowHidePassword}>
      {isState ? (
        <Image src={eye} alt="hide and show password" />
      ) : (
        <Image src={eyeSlash} alt="hide and show password" />
      )}
    </button>
  );
};

export default PasswordButton;
