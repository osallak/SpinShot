import SideBar from "../ui/sideBar/sideBar";
import Image from "next/image";
import game from "../../../public/game.svg"

const GamePage = () => {
  return (
    <div className="w-screen h-screen bg-very-dark-purple top-0 left-0 md:space-x-3 space-x-0 flex justify-start p-3 items-center flex-row">
      <SideBar />
      <div className="bg-white/10 h-full lg:flex flex-col hidden rounded-2xl xl:w-[570px] lg:w-[400px] w-[300px] space-y-8">
        <div className="flex justify-center items-center flex-col w-full h-[130px]">
          <div className="w-full h-[130px] flex-col px-6">
            <div className="w-full  pt-5 flex flex-row space-x-3 h-[130px]">
              <Image
                src={game}
                alt="message icon"
                className=" h-full xl:w-10 w-9"
              />
              <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
                Game
              </h1>
            </div>
            <div className="w-full border border-pearl border-opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
