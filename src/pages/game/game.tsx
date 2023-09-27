import SideBar from "@/Components/ui/Sidebar/SideBar";
import React, { useState, useEffect } from "react";
import Sidebar from "@/Components/ui/Sidebar/SideBar";
import SubSidebar from "@/Components/ui/Subsidebar/SubSidebar";
import SubSidebarGame from "@/Components/ui/Subsidebar/SubSidebarGame";
import NavbarMobile from "@/Components/ui/Navbar/NavbarMobile";
import NavGame from "@/Components/ui/Navbar/NavGame";
import SidebarM from "@/Components/ui/Sidebar/SidebarMobile";

const Game = () => {
  const [isopen, setMenu] = useState(false);
  const [opened, setOpned] = useState(false);
  const handleMenu = () => {
    setOpned(false);
    setMenu(!isopen);
  };
  return (
    <div className={"bg-very-dark-purple w-screen h-screen "}>
      <div className={` flex flex-row c-gb:space-x-1 p-2 w-full  h-full `}>
        <SideBar />
        <SubSidebarGame />

        { isopen && ( 
          <SidebarM
          handleClick={()=>{}}
          setOpned={setOpned}
          opened={opened}
          />
          )}
        <div className={` ${isopen ? "ml-[75px]" : null} h-full w-full flex-col flex  items-center rounded-2xl bg-white/10 space-y-10  relative  `}>
          <div className={`  w-full `}>

          <NavbarMobile
            setMenu={setMenu}
            handleMenu={handleMenu}
            isopen={isopen}
            />
            </div>
          <NavGame/>
          <div className=" h-full w-full flex justify-center items-center relative   ">
              <h1 className="c-gb:hidden block absolute top-[100px] sm:top-[130px] left-4 text-sm sm:text-3xl text-pearl ">Defi</h1>
            {/* <div className="absolute  w-[10%] h-[5%]  top-10 left-[0] 3xl:left-[6%] rounded-3xl bg-very-dark-purple "></div> */}
            <div className=" h-[70%] c-gb:h-[85%] w-[85%] sm:w-[75%] c-gb:w-[55%] bg-very-dark-purple rounded-3xl absolute   sm:min-w-[450px] c-gb:min-w-[600px]  top-[125px] sm:top-44 c-gb:top-28 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
