import chatMenu from "../../../../public/chatmenu.svg"
import React, { useState } from 'react'

import Image from "next/image";

const DropdownUser = (props :any) => {
    const [isOpen, setIsOpen] = useState(false);
    const Array = props.Array;

    return (
        <div className=" font-sans box-border  inline-block">
            <div className=" bg-cover flex justify-end relativ">
                <button className="py-2 px-4    cursor-pointer rounded-md" onClick={() => setIsOpen(!isOpen)}>
                    <Image src={chatMenu} alt="" />
                </button>
                {isOpen && (
                    <div className=" absolute my-11 mx-8 w-65 bg-very-dark-purple  rounded-l-[20px] rounded-b-[20px]">
                        {Array.map((option: any, index: number) => (
                            <div
                                key={index}
                                className={` `}
                            >
                                <button className="p-3 flex justify-between opacity-40 w-32 text-pearl hover:opacity-100 " onClick={() => setIsOpen(false)}>
                                        <Image src={option.icon} alt="" />
                                        <span> {option.name} </span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DropdownUser;