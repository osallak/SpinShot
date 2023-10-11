import Reac from 'react'
import Image from 'next/image'

export default function FocusSidebare() {
  return (
    <div className="backdrop:blur bg-white/10 space-y-4  w-[20%] relative sm:hidden flex justify-between items-center md:block rounded-[20px]">
    </div>
  )
}

{/*
      <div className="w-full flex flex-col space-y-14">
        <div className="flex justify-center items-center w-full h-full  text-[35px] font-Poppins font-extrabold text-pearl">
          <h1>Profile</h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="border border-pearl w-[80%] opacity-40">
          </div>
        </div>
      </div>
      <div className={`font-Poppins text-pearl border-green-500 text-[1.32rem] `} >
        {buttons.map((button) => (
          <div key={button.id} className={`flex justify-center items-center rounded-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm w-full h-20`}>
            <button className={`w-[90%] h-full rounded-2xl flex justify-center items-center ${subbackground === button.id ? ' bg-very-dark-purple' : ''}`} onClick={() => changeSubBackground(button.id)}>
              <div className="w-[60%] h-full flex justify-start items-center ">
                {button.text}
              </div>
            </button>
          </div>
        ))}
        <div className={` rounded-2xl p-6 ml-4 mr-4 ${background ? 'bg-very-dark-purple' : 'bg-white/12'} `} onClick={() => setBackground(true)}>
          <button className={` `} >Security</button>
          <button className="md:pl-24  2xl:pl-32" onClick={() => setClick(!isClick)}> <Image src={securityIcon} alt="" /> </button>
        </div>
        {isClick && (
          <div className="space-y-1">
            <div className="relative w-6 ml-20">
              <Image src={linechoose} alt="" />
            </div>
            <div className={` rounded-[20px] md:ml-[6.2rem] md:top-[-15px] md:w-[8.7rem]  2xl:pl-8 2xl:text-lg 2xl:w-[13.5rem] relative lg:w-[8.6rem] lg:ml-[6.3rem] lg:top-[-14px] ml-[5.5rem]  xl:pl-5 xl:text-[0.75rem] xl:w-32 p-1 text-[0.7rem] ${background ? 'bg-very-dark-purple' : 'bg-white/12'} `} onClick={() => setBackground(true)}>
              <p>Reset Password</p>
            </div>
            <div className=" w-6 relative top-[-72px] ml-20 ">
              <Image src={linechoose2} alt="" />
            </div>
            <div className={` flex flex-row  space-x-6  bg-${background} rounded-[20px]  text-center md:ml-[6.2rem] md:top-[-85px] top-2 md:w-[8.7rem] 2xl:top-[-90px] 2xl:pl-6 2xl:text-lg 2xl:w-[13.5rem] relative lg:w-[8.6rem] lg:ml-[6.3rem] lg:top-[-88px] ml-[5.5rem]   xl:ml-[6.4rem] xl:text-[0.75rem] xl:w-30 p-1 text-[0.7rem] ${background ? 'bg-very-dark-purple' : 'bg-white/12'} `} onClick={() => setBackground(true)}>
              <button >Tow Factory</button>
              <div className="h-[50px] w-[50px] ">
                <ToggleButton />
              </div>
            </div>
          </div>
      </div>
				*/}