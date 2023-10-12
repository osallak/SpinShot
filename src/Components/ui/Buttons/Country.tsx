import "tailwind-scrollbar";
import Twemoji from "react-twemoji";
import country from "country-list";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Country = (props:{setCountry:Function}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlag, setIsFlag] = useState("");
  const [isCountry, setIsCountry] = useState("Your Country");
  const countries = country.getData().sort((a: any, b: any) => {
    return a.name < b.name ? -1 : 1;
  });

  function getFlagEmoji(countryCode: any) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char: any) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  const sethandle = (flag: string, country:string) => {
    setIsCountry(country);
    props.setCountry(country);
    setIsFlag(flag);
  }

  const { getCode, getName } = require("country-list");

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="text-pearl text-opacity-40 relative  h-[20%] text- "
    >
      <motion.div
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.001,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        className="absolute  w-[100%]   text-black bg-peridot pt-14 p-2 pl-6 rounded-[20px] scrollbar  scrollbar-thumb-gray-900  overflow-auto h-[250px]"
      >
        {/* <div className="border border-red-500 scrollbar  scrollbar-thumb-gray-900  overflow-auto"> */}
        <motion.div className="">
          <motion.div className=" ">
            {countries.map((countent: any, index: any) => (
              <motion.div variants={itemVariants} className="" key={index}>
                <motion.button
                  className="flex flex-row  items-center text-[150%]"
                  variants={itemVariants}
                  value=""
                  onClick={() =>
                    sethandle(getFlagEmoji(countent.code), countent.name)
                  }
                >
                  <Twemoji options={{}}>
                    <motion.div className="w-[60%]">
                      {getFlagEmoji(countent.code)}
                    </motion.div>
                  </Twemoji>
                  <motion.span className=" ">{countent.name.length > 30 ? countent.name.slice(0,20) + '...' : countent.name}</motion.span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* </div> */}
      </motion.div>
      <motion.button
        className={` space-x-1 bg-very-dark-purple w-[100%] md:w-[100%] px-5 flex flex-row items-center absolute rounded-[20px] ${
          isOpen
            ? "text-white text-xl"
            : " placeholder:text-pearl placeholder:text-opacity-40"
        }  h-14   `}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Twemoji options={{ className: "twemoji"}}>
          <motion.div className="  flex flex-row space-x-6 items-center  ">
              { isFlag && <h1>{isFlag}</h1>}
              <h1> {isCountry.length > 25 ? isCountry.slice(0, 20) + '...' : isCountry}</h1>
          </motion.div>
        </Twemoji>
      </motion.button>
    </motion.div>
  );
};

export default Country;
