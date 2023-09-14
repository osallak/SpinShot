import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import React from "react";
import { resetPassword } from "../../Components/ui/DropDown/ArrayIcon";
import ToggleButton from "@/Components/ui/Buttons/ToggleButton";

const ResetPassword = () => {
  return (
    <div className=" space-y-20 md:space-y-36  h-[940px] ">
      <div className=" text-pearl text-[15px] sm:text-2xl  h-[14%] md:h-[18%] c-gb:h-[25%] flex items-center c-10xl:px-24 px-16">
        <h1 className="">Reset Password</h1>
      </div>
      <div className=" text-pearl h-[18%] c-gb:h-[25%] space-y-10 justify-center flex c-10xl:px-24 px-16 flex-col">
        {resetPassword.map((option, index) => (
          <div key={index} className=" flex flex-row justify-center">
            {/* <div className="flex items-center w-[20%] text-xl sm:text-2xl sm:text-2x  ">
              {option.text}
            </div> */}
            <div className="   bg-very-dark-purple w-[100%] md:w-[550px] rounded-[20px]">
              <input
                className=" bg-very-dark-purple w-[100%] rounded-[20px] px-7 h-14 opacity-40"
                type="text"
                placeholder={option.text}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="  flex items-end md:items-center md:justify-end md:right-0 mt-36 h-[10%]  justify-center px-28 ">
        <SimpleButton content="Save" onclick={() => ""} />
      </div>
    </div>
  );
};

export default ResetPassword;
