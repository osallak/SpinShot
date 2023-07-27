import Image from "next/image";
import { useState } from "react";
import { InputsProps } from "@/types/InputsProps";
import { ChangeEvent } from "react";
import PasswordButton from "../Buttons/PasswordButton";

const InputBorder: React.FC<InputsProps> = ({
  inputValue,
  setInputValue,
  type,
  PlaceHolder,
  icon,
  redicon,
  Border,
  Color,
  BorderSize,
  Regexp,
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [isReg, setisReg] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const Reg = inputValue.match(Regexp);
    if (!Reg) setisReg(false);
    else setisReg(true);
  };

  const handleBlur = () => {
    const Reg = inputValue.match(Regexp);
    if (!Reg) setisReg(false);
    else setisReg(true);
  };

  return (
    <div
      className={`rounded-2xl w-full h-full flex flex-row items-center bg-${Color} border-opacity-40 px-2 border-${BorderSize}`}
      style={{ borderColor: isReg ? Border : "red" }}
    >
      <div className="w-[100%] h-full flex">
        <div className="inset-y-0 left-1.5 flex items-center pointer-events-none space-x-64">
          {isReg ? (
            <Image src={icon} alt="username or Email" className="h-5 w-5" />
          ) : (
            <Image src={redicon} alt="username or Email" className="h-5 w-5" />
          )}
        </div>

        <input
          type={type == "password" && ShowPassword ? "text" : type}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={PlaceHolder}
          className={`w-full bg-transparent pl-3 h-full focus:outline-none ${
            isReg
              ? "placeholder:text-pearl"
              : "placeholder:text-red-900 placeholder:opacity-100"
          } placeholder:opacity-40 placeholder:font-Poppins, font-thin text-pearl focus:placeholder:opacity-0`}
        />
      </div>
      {type === "password" ? (
        <PasswordButton
          ShowPassword={ShowPassword}
          setShowPassword={setShowPassword}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBorder;
