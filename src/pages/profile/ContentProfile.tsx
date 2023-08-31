import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import Country from "@/Components/ui/Buttons/Country";
import React from 'react'

const ContentProfile = () => {
  return (
    <div>
        <div className=" space-y-10 md:space-y-20">
            <div className="text-pearl text-xl sm:text-2xl  h-40 flex items-center c-10xl:px-24 px-16">
                <span>Personal information</span>
            </div>
            <div className="flex flex-row justify-center h-[55%] px-4 sm:px-14 c-10xl:px-32 ">
                <div className="flex flex-col  text-pearl  w-full c-10xl:w-[80%] space-y-5 md:space-y-14  c-10xl:px-20 px-6 ">
                    <div className="   c-10xl:space-x-[15%] w-full  ">
                            <div className=" flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5 w-full c-10xl:w-full">
                                <input className="bg-very-dark-purple w-full c-10xl:w-full  rounded-[20px] px-5 h-12 placeholder:text-pearl placeholder:text-opacity-40" type="" required placeholder="First name" placeholder-pearl/>
                                <input className="bg-very-dark-purple w-full c-10xl:w-full  rounded-[20px] px-5 h-12 placeholder:text-pearl placeholder:text-opacity-40" type="" required placeholder="Last name"/>
                            </div>
                    </div>
                    <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
                        <div className=" w-full">
                            <input className="bg-very-dark-purple w-[100%] md:w-[49%]  rounded-[20px] px-5 h-12 placeholder:text-pearl placeholder:text-opacity-40" type="" required placeholder="Username"/>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row   c-10xl:space-x-[15%] items-center">
                        <div className=" w-full">
                            <input className="bg-very-dark-purple w-full  rounded-[20px] px-5 h-12 placeholder:text-pearl placeholder:text-opacity-40" type="" required placeholder="Email"/>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row  c-10xl:space-x-[10%] items-center">
                        <div className=" bg-very-dark-purple w-[100%] md:w-[49%]  rounded-[20px] h-12 placeholder:text-pearl placeholder:text-opacity-40">
                            <Country/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="  flex md:justify-end md:right-0 mt-10 justify-center px-28 ">
            <SimpleButton content="Save" onclick={()=>""}/>
        </div> 
    </div>
  )
}

export default ContentProfile;