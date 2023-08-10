import Racket from "../../../public/racket.svg";
import Image from "next/image";
import SimpleButton from "../ui/Buttons/SimpleButton";
import RacketThreeD from "./RacketThreeD";
import { MouseEvent } from "react";
import { useRouter } from "next/router";

const LandingPage = () => {
  const Router = useRouter();

  const redirect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Router.push("/Signin");
  };

  return (
    <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex items-center">
      <div className="fl:w-1/2 w-full h-full flex justify-center items-center x-pp:p-36 2xl:p-28 xl:p-20 fl:p-14 p-0 ">
        <div className="fl:w-[600px] w-full fl:h-[700px] h-full backdrop:blur fl:rounded-2xl rounded-none bg-white/10 flex justify-center items-center font-Poppins flex-col">
          <div className="w-[80%] h-full flex justify-center flex-col sm:space-y-10 b-sm:space-y-6 space-y-2">
            <div className="w-full flex flex-col space-y-3">
              <div className="text-peridot i-sm:text-6xl s-sm:text-5xl b-sm:text-4xl text-3xl font-bold w-full">
                SpinShot
              </div>
              <div className="w-full flex flex-row i-sm:space-x-4 s-sm:space-x-2 b-sm:space-x-1 space-x-0">
                <Image className="tx:w-[50px] i-sm:w-[40px] w-[30px] tx:h-[50px] i-sm:h-[40px] s-sm:h-[30px] b-sm:h-[20px] h-[10px] " src={Racket} alt="racket of ping pong" />
                <p className="text-pearl flex justify-center items-center text-opacity-40 font-semibold text-xl">
                  Ping-Pong
                </p>
                <Image className="tx:w-[50px] i-sm:w-[40px] w-[30px] tx:h-[50px] i-sm:h-[40px] s-sm:h-[30px] b-sm:h-[20px] h-[10px]" src={Racket} alt="racket of ping pong" />
              </div>
            </div>
            <div className="space-y-5">
              <p className="font-light c-md:text-lg sm:text-md i-sm:text-sm text-xs text-pearl text-opacity-40">
                Welcome to SpinShot! Prepare for a thrilling virtual experience
                of the classic ping pong arcade game that will test your
                reflexes and hand-eye coordination. Immerse yourself in the
                vibrant and dynamic environment as you step into the digital
                arena. <br />
                <br />
                The objective is simple: control the paddle and keep the ball
                bouncing back and forth between you and your opponent.
              </p>
            </div>
            <div className="w-full flex justify-center items-center">
              <SimpleButton
                Type="button"
                onclick={(e) => redirect(e)}
                content="Get Started"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fl:flex hidden justify-center items-center w-1/2 h-full ">
        <RacketThreeD />
      </div>
    </div>
  );
};

export default LandingPage;
