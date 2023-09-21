import threeLines from "../../../../public/threeLines.svg"
import test1 from "../../../../public/test1.svg"
import Image from "next/image"

const NavBar = () => {
  return (
    <div className='w-full sm:h-[70px] h-[65px] pl-3 pr-3 md:hidden flex justify-between items-center bg-white/10 rounded-2xl'>
      <button className="flex justify-center items-center w-10">
        <Image src={threeLines} alt="three lines"/>
      </button>
      <div>
        <div className="w-12 flex justify-center items-center">
          <Image src={test1} alt="test1" className="w-10"/>
        </div>
      </div>
    </div>
  )
}

export default NavBar