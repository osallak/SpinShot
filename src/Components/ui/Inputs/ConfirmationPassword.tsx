import Image from "next/image";
import { useState } from "react";
import { ConfirmProps } from "@/types/InputsProps";
import { ChangeEvent } from "react";
import PasswordButton from "../Buttons/PasswordButton";

const ConfirmationPassword: React.FC<ConfirmProps> = ({
  ConfirmPassword,
  setConfirmPassword,
  onchange,
  value,
  setisValid,
  PlaceHolder,
  icon,
  Border,
  Color,
  BorderSize,
  isReg,
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  // const [isReg, setisReg] = useState(true);

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setConfirmPassword(event.target.value);
  //   const Reg = ConfirmPassword.match(Regexp);
  //   if (!Reg) {
  //     setisReg(false);
  //     setisValid(false)
  //   } else {
  //     setisReg(true);
  //     setisValid(true);
  //     {ConfirmPassword !== Password ? setisValid(false) : setisValid(true)};
  //   }
  // };

  // const handleBlur = () => {
  //   const Reg = ConfirmPassword.match(Regexp);
  //   if (!Reg) setisReg(false);
  //   else setisReg(true);
  // };

  const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setConfirmPassword(event.target.value)
  }

  return (
    <div
      className={`sm:rounded-2xl rounded-xl w-full h-full flex flex-row items-center bg-${Color} px-2 border-${BorderSize}`}
      // style={{ borderColor: isReg ? Border : "#FF000060" }}
    >
      <div className="w-[100%] h-full flex">
        <div className="inset-y-0 left-1.5 flex items-center pointer-events-none space-x-64">
          <Image src={icon} alt="username or Email" className="h-5 w-5" />
        </div>
        <input
          type="password"
          value={value}
          onChange={HandleChange}
          onBlur={handleBlur}
          placeholder={PlaceHolder}
          className={`w-full bg-transparent pl-3 h-full focus:outline-none placeholder:opacity-40 placeholder:font-Poppins, font-thin text-pearl focus:placeholder:opacity-0`}
        />
      </div>
        <PasswordButton
          ShowPassword={ShowPassword}
          setShowPassword={setShowPassword}
        />
    </div>
  );
};

export default ConfirmationPassword;
