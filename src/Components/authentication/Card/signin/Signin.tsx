import { useRouter } from "next/router";
import lock from "../../../../../public/lock.svg";
import email from "../../../../../public/email.svg";
import SpinShotlogo from "../../../../../public/SpinShotlogo.svg"
import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import InputBorder from "@/Components/ui/Inputs/InputBorder";
import { MouseEvent, useState, useEffect } from "react";
import ContinueWithIntra from "@/Components/ui/Buttons/ContinueWithIntra";
import EmptyButton from "@/Components/ui/Buttons/EmptyButton";
import Image from "next/image";

const Signin = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isValid, setisValid] = useState(true);
  const [widthsc, setwidthsc] = useState<number | undefined>(undefined);
  const Router = useRouter();
  const SigninArray = [
    {
      inputValue: Username || Email,
      setinputValue: setUsername || setEmail,
      Value: Username || Email,
      setisValid: setisValid,
      type: "text",
      PlaceHolder: "Email or Username",
      icon: email,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
    },
    {
      inputValue: Password,
      setinputValue: setPassword,
      Value: Password,
      setisValid: setisValid,
      type: "password",
      PlaceHolder: "Password",
      icon: lock,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
    },
  ];

  const RedirectionFunction = (
    e: MouseEvent<HTMLButtonElement>,
    Path: string
  ) => {
    e.preventDefault();
    Router.push(Path);
  };

  const RedirectSignup = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Router.push("/Signup");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setwidthsc(window.innerWidth);
      };
      setwidthsc(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-col justify-center items-center ">
      <div className="c-md:w-[600px] c-md:h-[750px] w-full h-full backdrop:blur bg-white/10 c-md:rounded-2xl rounded-none flex justify-center items-center flex-col space-y-[2px]">
        <div className="w-full flex items-center justify-center flex-col c-md:space-y-9 space-y-6">
          <div className="flex c-md:pb-14 flex-col justify-center c-md:space-y-5 space-y-3 items-center">
            <div className="flex justify-center items-center">
              <Image className="c-md:w-[75px] w-[60px] c-md:h-[120px] h-[105px]" src={SpinShotlogo} alt="SpinShot logo" />
            </div>
            <div className="font-Poppins font-semibold text-pearl c-md:text-2xl sm:text-lg mc:text-md text-xs text-opacity-40">
              Welcome Back!
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-[100%]">
            <form
              autoComplete="off"
              className="flex justify-start space-y-5 items-center flex-col"
              style={{
                width: "100%",
              }}
            >
              <div className="flex justify-center items-center w-full h-full flex-col c-md:space-y-5 space-y-3">
                {SigninArray.map((SignIn, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center sm:w-[67%] w-[70%] c-md:h-[45px] h-[35px]"
                  >
                    <InputBorder
                      inputValue={SignIn.inputValue}
                      setinputValue={SignIn.setinputValue}
                      value={SignIn.Value}
                      type={SignIn.type}
                      PlaceHolder={SignIn.PlaceHolder}
                      icon={SignIn.icon}
                      Border={SignIn.Border}
                      Color={SignIn.Color}
                      BorderSize={2}
                    />
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center items-center flex-col sm:space-y-12 space-y-8">
                <div className="w-full flex justify-center items-center rounded-full">
                  <SimpleButton
                    Type="submit"
                    onclick={(e) =>
                      RedirectionFunction(e, "/PersonalInformation")
                    }
                    content="Sign in"
                  />
                </div>
                <div className="flex flex-col justify-center items-center c-md:space-y-10 space-y-3 w-full">
                  <div className="flex justify-center items-center pt-10 flex-row space-x-5 w-full">
                    <div className="border w-[46%] border-pearl border-opacity-40"></div>
                    <p className="font-Passion-One text-pearl text-opacity-40">
                      Or
                    </p>
                    <div className="border w-[46%] border-pearl border-opacity-40"></div>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <ContinueWithIntra
                      onclick={(e) =>
                        RedirectionFunction(e, "/PersonalInformation")
                      }
                      content="Continue With Intra"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          {widthsc && widthsc <= 650 && (
            <div className="w-full flex flex-row justify-center items-center space-x-1">
              <p className="font-Poppins font-normal text-pearl text-opacity-40 c-md:text-lg sm:text-md text-xs">
                Don't have an account?
              </p>
              <EmptyButton
                onclick={(e) => RedirectionFunction(e, "/Signup")}
                content="Sign up"
              />
            </div>
          )}
        </div>
      </div>
      {widthsc && widthsc > 650 && (
        <div className="w-full c-md:bg-transparent c-md:backdrop:blur-none backdrop:blur bg-white/10 flex flex-row justify-center items-center">
          <p className="font-Poppins font-normal text-pearl text-opacity-40 c-md:text-lg sm:text-md text-xs">
            Don't have an account?&nbsp;
          </p>
          <EmptyButton onclick={(e) => RedirectionFunction(e, "/Signup")} content="Sign Up" />
        </div>
      )}
    </div>
  );
};

export default Signin;
