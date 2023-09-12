import Sidebar from "@/Components/ui/Sidebar/SideBar";
import SubSidebar from "@/Components/ui/Subsidebar/SubSidebar";
import React from "react";

const game = () => {
  return (
    <div className="m-2">
      <div className="flex flex-row space-x-2">
          <Sidebar />
        <div className="backdrop:blur  bg-white/10 h-[99vh] rounded-[20px]  w-[20%] space-y-[10%]">
            <div className="space-y-11 text-[35px] font-Poppins font-extrabold text-pearl">
                <h1 className="ml-20 mt-7">Game</h1>
                <div className="flex justify-center items-center">
                    <div className="border opacity-40 w-[80%]"></div>
                </div>
            </div>
            <div className="space-y-20 text-[35px] font-Poppins font-extrabold text-pearl px-14">
                <div className="">Option</div>
                <div className="space-y-[50%]">
                  <div className="px-8">Mode</div>
                  {/* <div className="border-t-0 border-b-0 border-r-0 border h-16 rounded-b-[20px]"></div> */}
                  <div className="px-8">Maps</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default game;
