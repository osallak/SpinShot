import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonProps } from "../../../types/ButtonProps";

const IconButton: React.FC<ButtonProps> = ({ icon, content, onclick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="rounded-full flex justify-center items-center bg-peridot w-full h-full "
    >
      <button
        onClick={onclick}
        className="rounded-full xl:text-xl lg:text-md md:text-sm text-xs w-full h-full font-Passion-One flex lg:space-x-2 md:space-x-1 space-x-0 justify-center items-center text-very-dark-purple"
      >
        <Image
          className="md:w-6 w-4"
          src={icon}
          alt="channel's icons"
        />
        <span>{content}</span>
      </button>
    </motion.div>
  );
};

export default IconButton;
