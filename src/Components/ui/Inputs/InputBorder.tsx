import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { InputsProps } from "@/types/InputsProps";
import { ChangeEvent } from "react";

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
    <div className={`relative w-${Width} flex flex-row items-center`}>
      <input
        type={type == "password" && ShowPassword ? "text" : type}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={content}
        className={`bg-${Color} pl-10 pr-4 py-2 rounded-2xl w-full h-full border-${BorderSize} border-${Border} border-opacity-40 focus:outline-none placeholder:text-pearl placeholder:opacity-40 placeholder:font-Poppins, font-thin text-pearl focus:placeholder:opacity-0`}
      />
      {type === "password" ? (
        <PasswordButton
          ShowPassword={ShowPassword}
          setShowPassword={setShowPassword}
        />
      ) : (
        ""
      )}
      <motion.div className="absolute inset-y-0 left-1.5 pl-2 flex items-center pointer-events-none space-x-64">
        <Image
          src={icon}
          alt="username or Email"
          className="h-5 w-5 text-gray-500"
        />
      </motion.div>
    </div>
  );
};

export default InputBorder;
