import Image from "next/image";
import { motion } from "framer-motion";
import Intra from "../../../../public/Intra.svg";
import { OthersProps } from "../../../types/ButtonProps";

const ContinueWithIntra: React.FC<OthersProps> = ({ onclick, content }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className={`rounded-full flex justify-center items-center bg-peridot b-sm:w-48 c-md:h-10 w-full sm:h-10 h-9`}
    >
      <button
        onClick={onclick}
        className="rounded-full c-md:text-xl b-sm:text-lg text-xs/3 w-full h-full font-Passion-One text-very-dark-purple flex space-x-2 justify-center items-center"
      >
        <Image className="b-sm:w-6 b-sm:h-6 w-4 h-4" src={Intra} alt="Intra icon" />
        <span>{content}</span>
      </button>
    </motion.div>
  );
};

export default ContinueWithIntra;
