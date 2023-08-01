import Image from "next/image";
import { useEffect, useState } from "react";
import { InputsProps } from "@/types/InputsProps";
import { ChangeEvent } from "react";
import PasswordButton from "../Buttons/PasswordButton";

const InputBorder: React.FC<InputsProps> = ({
  inputValue,
  setinputValue,
  // onchange,
  value,
  setisValid,
  type,
  PlaceHolder,
  icon,
  Border,
  Color,
  BorderSize,
  isReg,
}) => {
  const [ShowPassword, setShowPassword] = useState(false);

  useEffect(() => {
  }, [inputValue])
  const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setinputValue(event.target.value)
  }

  return (
    <div
      className={`sm:rounded-2xl rounded-xl w-full h-full flex flex-row items-center bg-${Color} px-2 border-${BorderSize}`}
      style={{ borderColor: isReg ? Border : "#FF000060" }}
    >
      <div className="w-[100%] h-full flex">
        <div className="inset-y-0 left-1.5 flex items-center pointer-events-none space-x-64">
          <Image src={icon} alt="username or Email" className="h-5 w-5" />
        </div>
        <input
          type={type == "password" && ShowPassword ? "text" : type}
          value={value}
          onChange={(event) => HandleChange(event)}
          // onFocus={(e) => {
          //   console.log('Focused on input');
          // }}
          // onBlur={handleBlur}
          placeholder={PlaceHolder}
          className={`w-full bg-transparent pl-3 h-full focus:outline-none placeholder:opacity-40 placeholder:font-Poppins, font-thin text-pearl focus:placeholder:opacity-0`}
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
