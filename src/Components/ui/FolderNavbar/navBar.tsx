import threeLines from "../../../../public/threeLines.svg";
import test1 from "../../../../public/test1.svg";
import Image from "next/image";
import { MouseEvent } from "react";

const NavBar = (props: { open: boolean; setOpen: Function }) => {
  const openSideBar = () => {
    props.setOpen(!props.open);
  };

  return (
    <div className="w-full h-[9%] md:hidden flex justify-center items-center px-2 pt-2 pb-1">
      <div className="w-full h-full flex justify-between p-3 items-center bg-white/10 rounded-xl">
        <button
          onClick={openSideBar}
          className="flex justify-center items-center w-10"
        >
          <Image src={threeLines} alt="three lines" />
        </button>
        <div className="h-full flex justify-center items-center">
          <div className="flex justify-center items-center">
            <Image src={test1} alt="test1" className="sm:w-10 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
