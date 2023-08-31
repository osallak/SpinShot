import menu from "./../../../public/menu.svg"
import React, { useState } from 'react'
import ibenmain from "./../../../public/ibenmain.jpeg"

import Image from "next/image"


const  Navbar = () => {
    const [isopen, setMenu] = useState(false);

    return (
     <div>
        <div className="block c-gb:hidden  backdrop:blur bg-white/10 rounded-[20px] h-16 ">
            <div className="flex flex-row justify-between">
                <button className=" block c-gb:hidden " onClick={() => setMenu(!isopen)}>
                    <Image src={menu} alt="" />
                </button>
                <div className=" px-4 flex justify-end items-center space-x-2">
                    <div className="flex flex-col justify-end items-end text-pearl text-opacity-40">
                        <span>ibenmain</span>
                        <div className="hidden sm:block">
                         <span>ibenmain@gmail.com</span>
                        </div>
                    </div>
                    <Image className=" rounded-full w-[50px]" src={ibenmain} alt="" />
                </div>
            </div>
        </div>
     </div>
  );
}

export default Navbar
