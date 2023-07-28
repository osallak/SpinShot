import { motion } from "framer-motion";
import { OthersProps } from "../../../types/ButtonProps";

const SimpleButton: React.FC<OthersProps> = ({ onclick, content }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="md:w-40 w-32 md:h-10 h-7 rounded-full flex justify-center items-center bg-peridot"
    >
      <button
        onClick={onclick}
        className="rounded-full text-sm md:text-xl w-full h-full font-Passion-One text-very-dark-purple"
      >
        {content}
      </button>
    </motion.div>
  );
};

export default SimpleButton;
