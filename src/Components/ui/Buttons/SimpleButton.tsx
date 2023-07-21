import { motion } from "framer-motion"

export default function SimpleButton(props: {onclick: () => void, content: string}) {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }} 
      className='md:w-40 w-32 md:h-10 h-7 rounded-full flex justify-center items-center bg-peridot'>
      <button
        onClick={props.onclick} className='rounded-full text-sm md:text-xl w-full h-full font-Passion-One text-very-dark-purple'>
        {props.content}
      </button>
    </motion.div>
  )
}
