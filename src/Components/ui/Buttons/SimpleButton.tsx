import { motion } from "framer-motion";
import { OthersProps } from "../../../types/ButtonProps";

const SimpleButton: React.FC<OthersProps> = ({ onclick, content }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="b-sm:w-40 w-3/4 c-md:h-10 sm:h-10 h-9 rounded-full flex justify-center items-center bg-peridot"
    >
      <button
        onClick={onclick}
        className={`"bg-peridot" rounded-full text-lg sm:text-xl w-full h-full font-Passion-One text-very-dark-purple`}
      >
        {content}
      </button>
    </motion.div>
  );
};

export default SimpleButton;
