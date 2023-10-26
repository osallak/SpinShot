import { motion } from "framer-motion";
import { OthersProps } from "../../../types/ButtonProps";
import { useEffect, useState } from "react";

const SimpleButton: React.FC<OthersProps> = ({ Type, onclick, content, onkeydown, gameSession }) => {
  const [clickable, setClickable] = useState(true);

  useEffect(() => {
    if (gameSession) {
      setClickable(false);
    } else {
      setClickable(true);
    }
  }, [gameSession])
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="rounded-full flex justify-center items-center bg-peridot w-full h-full"
    >
      <button
        onKeyDown={onkeydown}
        type={Type}
        disabled={!clickable}
        onClick={onclick}
        className={`"bg-peridot" rounded-full text-lg sm:text-xl w-full h-full font-Passion-One text-very-dark-purple`}
      >
        {content}
      </button>
    </motion.div>
  );
};

export default SimpleButton;
