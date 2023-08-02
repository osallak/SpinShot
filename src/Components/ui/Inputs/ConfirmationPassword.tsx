import Image from "next/image";
import { useState } from "react";
import { ConfirmProps } from "@/types/InputsProps";
import { FocusEvent, ChangeEvent } from "react";
import PasswordButton from "../Buttons/PasswordButton";

const ConfirmationPassword: React.FC<ConfirmProps> = ({
  Password,
  inputValue,
  setinputValue,
  value,
  setisValid,
  setisMatch,
  type,
  PlaceHolder,
  icon,
  Border,
  Color,
  BorderSize,
  Reg,
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [ValidReg, setValidReg] = useState(true)

  const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = event.target.value
    setinputValue(value)
    const isReg = value.match(Reg)
    if (!isReg) {
      setValidReg(false)
      setisValid(false)
    } else {
      setValidReg(true)
      setisValid(true)
    }
  }

  const HandleBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault()
    const isReg = inputValue.match(Reg)
    if (!isReg) {
      setValidReg(false)
      setisValid(false)
    } else {
      setValidReg(true)
      setisValid(true)
    }
    if (inputValue !== Password) {
      setisValid(false)
      setisMatch(false)
    } else {
      setisMatch(true)
      setisValid(true)
    }
  }

  return (
    <div
      className={`sm:rounded-2xl rounded-xl w-full h-full flex flex-row items-center bg-${Color} px-2 border-${BorderSize}`}
      style={{ borderColor: ValidReg ? Border : "#FF000060" }}
    >
      <div className="w-[100%] h-full flex">
        <div className="inset-y-0 left-1.5 flex items-center pointer-events-none space-x-64">
          <Image src={icon} alt="username or Email" className="h-5 w-5" />
        </div>
        <input
          type={type == "password" && ShowPassword ? "text" : type}
          value={value}
          onChange={(event) => HandleChange(event)}
          onBlur={(event) => HandleBlur(event)}
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
