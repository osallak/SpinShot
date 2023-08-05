import Racket from "../../../public/racket.svg";
import Image from "next/image";
import SimpleButton from "../ui/Buttons/SimpleButton";
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
      <div className="c-md:w-1/2 w-full h-full flex justify-center items-center bg-very-dark-purple">
        <div className="c-md:w-[600px] c-md:h-[750px] w-full h-full backdrop:blur bg-white/10 c-md:rounded-2xl rounded-none flex justify-center items-center font-Poppins flex-col">
          <div className="w-[80%] h-full flex justify-center flex-col space-y-10">
            <div className="w-full flex flex-col space-y-3">
              <div className="text-peridot c-md:text-7xl sm:text-xl font-bold w-full">
                SpinShot
              </div>
              <div className="w-full flex flex-row space-x-4">
                <Image src={Racket} alt="racket of ping pong" />
                <p className="text-pearl text-opacity-40 font-semibold c-md:text-3xl sm:text-lg text-sm">
                  Ping-Pong
                </p>
                <Image src={Racket} alt="racket of ping pong" />
              </div>
            </div>
            <div className="space-y-5">
              <p className="font-light c-md:text-lg sm:text-md text-sm text-pearl text-opacity-40">
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
    </div>
  );
};

export default LandingPage;
