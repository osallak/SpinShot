import Image from "next/image";
import eye from "../../../../public/eye.svg";
import eyeSlash from "../../../../public/eye-slash.svg";

const PasswordButton = ({
  ShowPassword,
  setShowPassword,
}: {
  ShowPassword: boolean;
  setShowPassword: Function;
}) => {
  const ShowHidePassword = () => {
    setShowPassword(!ShowPassword);
  };
  return (
    <button
      className="right-1 md:w-9 md:h-9 w-5 h-5 flex justify-center items-center"
      onClick={ShowHidePassword}
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
