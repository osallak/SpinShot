import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ButtonProps } from "../../../types/ButtonProps";

const IconButton: React.FC<ButtonProps> = ({ icon, content, onclick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="rounded-full flex justify-center items-center bg-peridot py-1.5 md:w-44 w-32 md:h-10 h-7"
    >
      <button
        onClick={onclick}
        className="rounded-full md:text-xl text-sm w-full h-full font-Passion-One flex space-x-2 justify-center items-center text-very-dark-purple"
      >
        <Image
          className="md:w-6 w-5 md:h-6 h-5"
          src={icon}
          alt="channel's icons"
        />
        <span>{content}</span>
      </button>
    </motion.div>
  );
};

export default IconButton;
