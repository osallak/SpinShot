import 'tailwind-scrollbar';
import Twemoji from 'react-twemoji';
import React, { useState } from 'react'
import country from 'country-list'
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const Country = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isCountry, setIsCountry] = useState('Your Country');
  const countries = country.getData().sort((a: any, b: any) => {
    return a.name < b.name ? -1 : 1;
  });
  console.log(countries);
  function getFlagEmoji(countryCode: any) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char:any) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
  const { getCode, getName } = require('country-list');

  console.log(getCode('Nowhere-to-be-found-land')); 
  return (
    <motion.div initial={false} animate={isOpen ? "open" : "closed"} className='text-pearl text-opacity-40 relative  h-[20%] '>

      <motion.div
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.001
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        className='absolute  w-[100%]  text-black bg-peridot pt-14 p-2 pl-6 rounded-[20px]  h-[250px] scrollbar  scrollbar-thumb-gray-900  overflow-auto'
        > 
        <motion.div className=''>
            <motion.div className=' ' >
            {countries.map((countent, index) => (
              <motion.div variants={itemVariants}  className='' key={index}>
                <motion.button className='flex flex-row  items-center text-[150%]' variants={itemVariants} value="" onClick={() => setIsCountry(getFlagEmoji(countent.code) + " " + countent.name)}>
                  <Twemoji options={{ className: 'twemoji ' }}>
                    <motion.div className='w-[60%] '>
                      {getFlagEmoji(countent.code)}
                    </motion.div>
                  </Twemoji>
                  <motion.span>{countent.name}</motion.span>
                </motion.button>
              </motion.div>
              ))}
            </motion.div>
          </motion.div>
      </motion.div>
      <motion.button className={` space-x-1  bg-very-dark-purple w-[100%] md:w-[100%] px-5 flex flex-row items-center absolute rounded-[20px] ${isOpen ? 'text-white text-xl' : ' placeholder:text-pearl placeholder:text-opacity-40'}  h-12   `} whileTap={{ scale: 0.99 }} onClick={() => setIsOpen(!isOpen)} >
              <Twemoji options={{ className: 'twemoji ' }}>
                <motion.div className=' w-[65%] '>
                  {isCountry.split(" ")[0]}
                </motion.div>
              </Twemoji>
              <motion.span  >{isCountry.split(" ")[1]}</motion.span>
      </motion.button>
    </motion.div>
  );
}

export default Country;