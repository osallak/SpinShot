import { motion } from "framer-motion";
import { animate } from "framer-motion/dom"
import { OthersProps } from "../../../types/ButtonProps";

const EmptyButton: React.FC<OthersProps> = ({ onclick, content }) => {
  return (
    <motion.button
      className="font-Passion-One text-pearl md:text-xl h-5 text-sm flex justify-center border-b-2 border-pearl items-center"
      onClick={onclick}
      whileTap={{ scale: 0.9 }}
    >
      {content}
    </motion.button>
  );
};

export default EmptyButton
