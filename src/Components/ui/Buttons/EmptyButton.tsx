import { motion } from "framer-motion";
import { ButtonProps } from "../../../types/ButtonProps";

const EmptyButton: React.FC<ButtonProps> = ({ onclick, content }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="md:w-40 w-32 md:h-10 h-7 rounded-full flex justify-center items-center"
    >
      <button
        onClick={onclick}
        className="font-Passion-One text-pearl md:text-xl text-sm"
      >
        {content}
      </button>
    </motion.div>
  );
};

export default EmptyButton
