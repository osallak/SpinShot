import React from "react";
import { SidbarIcon } from "../DropDown/ArrayIcon";
import Image from "next/image";
import test1 from "./../../../../public/test1.svg";

const SidebarM = (props: {
  handleClick: Function;
  setOpned: Function;
  opened: boolean;
}) => {
  return (
    <div>
      <div className=" fixed  w-[70px] h-full c-gb:h-full  backdrop:blur   bg-white/10 c-gb:hidden block rounded-[20px] mr-1 ">
        <div className=" space-y-6 mt-2  ">
          {SidbarIcon.map((Icon, index) => (
            <div
              key={index}
              className="flex justify-center items-center opacity-40 m-2"
            >
              <button
                className={``}
                onClick={() => {
                  props.opened == false
                    ? props.handleClick(true, Icon.route)
                    : props.setOpned(false);
                }}
              >
                <Image src={Icon.icon} alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
        {/* <div className="">
          <Image src={test1} alt="test1" />
        </div> */}
    </div>
  );
};

export default SidebarM;
