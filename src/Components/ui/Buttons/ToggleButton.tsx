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
    <div className="h-full w-full">
      <motion.button
        className={`h-full w-full bg-light-grey bg-opacity-20 rounded-full flex items-center`}
        style={{ justifyContent: isActive ? "flex-end" : "flex-start" }}
        onClick={Switch}
      >
        <motion.div
          className="md:h-6 md:w-6 h-4 w-4 opacity-100 rounded-full flex justify-center items-center"
          layout
        >
          {isActive ? (
            <Image
              className=""
              src={active}
              alt="unactive button"
            />
          ) : (
            <Image
              className=""
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
