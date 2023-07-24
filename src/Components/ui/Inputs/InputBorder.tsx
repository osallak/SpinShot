import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { InputsProps } from "@/types/InputsProps";
import { ChangeEvent } from "react";
import PasswordButton from "../Buttons/PasswordButton";
const InputBorder: React.FC<InputsProps> = ({
  type,
  content,
  icon,
  Width,
  Border,
  Color,
  BorderSize,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={`rounded-2xl w-[${Width}px] h-10 flex flex-row items-center bg-${Color} border-opacity-40 px-2 border-${Border} border-${BorderSize}`}
    >
      <div className="w-[100%] h-full flex">
        <motion.div className="inset-y-0 left-1.5 flex items-center pointer-events-none space-x-64">
          <Image
            src={icon}
            alt="username or Email"
            className="h-5 w-5 text-gray-500"
          />
        </motion.div>

        <input
          type={type == "password" && ShowPassword ? "text" : type}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={content}
          className={`w-full bg-transparent pl-3 h-full focus:outline-none placeholder:text-pearl placeholder:opacity-40 placeholder:font-Poppins, font-thin text-pearl focus:placeholder:opacity-0`}
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
