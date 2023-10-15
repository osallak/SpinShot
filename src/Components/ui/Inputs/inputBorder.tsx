import Image from "next/image";
import { KeyboardEvent } from "react";
import { InputsProps} from "@/types/InputsProps";
import { ChangeEvent, FocusEvent, useState } from "react";
import PasswordButton from "@/Components/ui/Buttons/PasswordButton";

const InputBorder: React.FC<InputsProps> = ({
  inputValue,
  setinputValue,
  value,
  setisValid,
  setisMatch,
  ConfirmPassword,
  type,
  PlaceHolder,
  icon,
  Border,
  Color,
  BorderSize,
  Reg,
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [ValidReg, setValidReg] = useState(true);

  const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setinputValue(value);
    if (setisMatch !== undefined) {
      if (ConfirmPassword!) {
        if (ConfirmPassword !== value)
          setisMatch(false)
        else setisMatch(true)
      }
    }
  };

  const HandleBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const isReg = inputValue.match(Reg || "");
    if (Reg) {
      if (!isReg) {
        setValidReg(false);
        if (setisValid !== undefined)
          setisValid(false);
      } else {
        setValidReg(true);
        if (setisValid !== undefined)
          setisValid(true);
      }
    }
  };

  return (
    <div
      className={`c-md:rounded-2xl rounded-xl w-full h-full flex flex-row items-center bg-${Color} px-2 border-${BorderSize}`}
      style={{ borderColor: ValidReg ? Border : "#FF000060" }}
    >
      <div className="w-[100%] h-full flex">
        <div className="inset-y-0 left-1.5 flex items-center pointer-events-none space-x-64">
          <Image src={icon} alt="username or Email" className="h-5 w-5" />
        </div>
        <input
          autoComplete="off"
          type={type == "password" && ShowPassword ? "text" : type}
          value={value}
          onChange={(event) => HandleChange(event)}
          onBlur={(event) => HandleBlur(event)}
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
