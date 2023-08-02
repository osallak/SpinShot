import { motion } from "framer-motion";
import { OthersProps } from "../../../types/ButtonProps";

const SimpleButton: React.FC<OthersProps> = ({ Type, onclick, content }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="md:w-40 w-32 md:h-10 sm:h-10 h-9 rounded-full flex justify-center items-center bg-peridot"
    >
      <button
        type={Type}
        onClick={onclick}
        className={`"bg-peridot" rounded-full text-md md:text-xl w-full h-full font-Passion-One text-very-dark-purple`}
      >
        {content}
      </button>
    </motion.div>
  );
};

export default SimpleButton;
