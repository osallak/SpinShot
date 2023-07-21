import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Intra from '../../../public/Intra.svg'


export default function ContinueWithIntra(props: {onclick: () => void, content: string}) {
  return (
    <motion.div whileTap={{scale: 0.9}} className={`rounded-full flex justify-center items-center bg-peridot md:w-48 w-40 md:h-10 h-7`}>
        <button onClick={props.onclick} className='rounded-full md:text-xl text-sm w-full h-full font-Passion-One text-very-dark-purple flex space-x-2 justify-center items-center'>
            <Image className='md:w-6 md:h-6 w-5 h-5'
              src={Intra}
              alt="Intra icon"
            />
            <span >{props.content}</span>
        </button>
    </motion.div>
  )
}
