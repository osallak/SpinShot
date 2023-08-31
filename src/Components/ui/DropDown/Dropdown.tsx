import chatMenu from "../../../../public/chatmenu.svg"
import React, { useState } from 'react'

import Image from "next/image";

const Dropdown = (props :any) => {
    const [isOpen, setIsOpen] = useState(false);
    const Array = props.Array;

    return (
            <div className=" ">
                <div className="  flex justify-end">
                    <button className="" onClick={() => setIsOpen(!isOpen)}>
                        <Image src={chatMenu} alt="" />
                    </button>
                </div>
                {isOpen && (
                    <div className=" mr-4  bg-very-dark-purple  rounded-l-[20px] rounded-b-[20px]"> {Array.map((option: any, index: any) => (
                            <div
                                key={index}
                                className={`px-4 py-2 divide-y-4}`}
                            >
                                <button className="space-x-2 flex justify-row opacity-40 text-pearl hover:opacity-100" >
                                    <div className="">
                                        <Image src={option.icon} alt="" />
                                    </div>
                                    <span> {option.name} </span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
    );
}

export default Dropdown;