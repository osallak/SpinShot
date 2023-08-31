import chatMenu from "../../../../public/chatmenu.svg"
import React, { useState } from 'react'

import Image from "next/image";

const DropdownUser = (props :any) => {
    const [isOpen, setIsOpen] = useState(false);
    const Array = props.Array;

    return (
        <div className=" font-sans box-border  inline-block">
            <div className=" bg-cover flex justify-end relativ">
                <button className="py-2 px-4  bg-very-dark-purple  cursor-pointer rounded-md" onClick={() => setIsOpen(!isOpen)}>
                    <Image src={chatMenu} alt="" />
                </button>
                {isOpen && (
                    <div className="p-4 absolute my-11 mx-8 w-65 bg-very-dark-purple  rounded-l-[20px] rounded-b-[20px]">
                        {Array.map((option: any, index: any) => (
                            <div
                                key={index}
                                className={`px-4 py-2 divide-y-4}`}
                            >
                                <button className=" flex justify-row opacity-40 text-pearl hover:opacity-100" onClick={() => setIsOpen(false)}>
                                    <div className="pr-4">
                                        <Image src={option.icon} alt="" />
                                    </div>
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