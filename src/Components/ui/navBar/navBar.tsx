import threeLines from "../../../../public/threeLines.svg";
import test1 from "../../../../public/test1.svg";
import Image from "next/image";

const NavBar = () => {
  return (
    <div className="w-full h-[8%] border md:hidden flex justify-center items-center px-2 pt-2 pb-1">
      <div className="w-full h-full flex justify-between px-3 items-center bg-white/10 rounded-xl border border-red-500">
        <button className="flex justify-center items-center w-10">
          <Image src={threeLines} alt="three lines" />
        </button>
        <div>
          <div className="flex justify-center items-center">
            <Image src={test1} alt="test1" className="sm:w-10 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
