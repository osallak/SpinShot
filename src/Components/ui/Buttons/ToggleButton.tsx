import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import active from "../../../../public/active.svg";
import unactive from "../../../../public/unactive.svg";

const ToggleButton = () => {
  const [isActive, setisActive] = useState(false);
  const Switch = () => {
    setisActive((isActive) => !isActive)
  };
  return (
    <div className="bg-red h-6 w-10">
      <motion.button
        className={`h-6 w-10 bg-light-grey bg-opacity-20 rounded-full px-0.5 flex items-center`}
        style={{ justifyContent: isActive ? "flex-end" : "flex-start" }}
        onClick={Switch}
      >
        <motion.div
          className="h-5 w-5 opacity-100 rounded-full flex justify-center items-center"
          layout
        >
          {isActive ? (
            <Image className="w-5 h-5" src={active} alt="unactive button" />
          ) : (
            <Image className="w-full h-full" src={unactive} alt="active button" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}

export default ToggleButton
