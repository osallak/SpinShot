import { motion } from "framer-motion";
import { OthersProps } from "../../../types/ButtonProps";

const EmptyButton: React.FC<OthersProps> = ({ flag, onclick, content }) => {
  return (
    <motion.button
      className={`font-Poppins font-semibold text-pearl ${flag === "authentication" ? "text-opacity-70" : "text-opacity-100"} c-md:text-lg sm:text-md text-xs h-5 flex justify-center items-center hover:text-opacity-100 hover:border-opacity-100`}
      onClick={onclick}
      whileTap={{ scale: 0.9 }}
    >
      {content}
    </motion.button>
  );
};

export default EmptyButton;
