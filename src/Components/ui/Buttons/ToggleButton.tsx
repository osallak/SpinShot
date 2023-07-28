import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import active from "../../../../public/active.svg";
import unactive from "../../../../public/unactive.svg";

const ToggleButton = () => {
  const [isActive, setisActive] = useState(false);
  const Switch = () => {
    setisActive((isActive) => !isActive);
  };
  return (
    <div className="bg-red md:h-6 md:w-10 h-4 w-7">
      <motion.button
        className={`md:h-8 md:w-14 h-6 w-9 bg-light-grey bg-opacity-20 rounded-full px-1 flex items-center`}
        style={{ justifyContent: isActive ? "flex-end" : "flex-start" }}
        onClick={Switch}
      >
        <motion.div
          className="md:h-6 md:w-6 h-4 w-4 opacity-100 rounded-full flex justify-center items-center"
          layout
        >
          {isActive ? (
            <Image
              className="w-full h-full"
              src={active}
              alt="unactive button"
            />
          ) : (
            <Image
              className="w-full h-full"
              src={unactive}
              alt="active button"
            />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ToggleButton;
