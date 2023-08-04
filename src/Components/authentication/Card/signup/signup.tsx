import InputBorder from "@/Components/ui/Inputs/InputBorder";
import { useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import user from "../../../../../public/user.svg";
import email from "../../../../../public/email.svg";
import lock from "../../../../../public/lock.svg";
import SpinShotlogo from "../../../../../public/SpinShotlogo.svg";
import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import { useRouter } from "next/router";
import ConfirmationPassword from "@/Components/ui/Inputs/ConfirmationPassword";
import EmptyButton from "@/Components/ui/Buttons/EmptyButton";

const Signup = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isValid, setisValid] = useState(false);
  const [isMatch, setisMatch] = useState(true);
  const [widthsc, setwidthsc] = useState<number | undefined>(undefined);
  const Router = useRouter();
  const SignupArray = [
    {
      inputValue: Username,
      setinputValue: setUsername,
      value: Username,
      setisValid: setisValid,
      type: "username",
      PlaceHolder: "Username",
      icon: user,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
      Reg: /^[a-zA-Z0-9_.]{3,16}$/,
    },
    {
      inputValue: Email,
      setinputValue: setEmail,
      value: Email,
      setisValid: setisValid,
      type: "email",
      PlaceHolder: "Email",
      icon: email,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
      Reg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    {
      inputValue: Password,
      setinputValue: setPassword,
      value: Password,
      setisValid: setisValid,
      setisMatch: setisMatch,
      ConfirmPassword: ConfirmPassword,
      type: "password",
      PlaceHolder: "Password",
      icon: lock,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
      Reg: /^.{6,}$/,
    },
  ];

  const RedirectionFunction = (
    e: MouseEvent<HTMLButtonElement>,
    Path: string
  ) => {
    e.preventDefault();
    if (isValid && isMatch) Router.push(Path);
  };

  const RedirectSignin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Router.push("/Signin");
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

  useEffect(() => {
    if (!Username || !Email || !Password || !ConfirmPassword || !isMatch)
      setisValid(false);
  }, [isValid]);

  return (
    <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-col justify-center items-center ">
      <div className="c-md:w-[600px] c-md:h-[750px] w-full h-full backdrop:blur bg-white/10 c-md:rounded-2xl rounded-none flex justify-center items-center flex-col space-y-9">
        <div className="w-full flex items-center justify-center flex-col c-md:space-y-9 space-y-6">
          <div className="flex flex-col justify-center c-md:space-y-5 space-y-3 items-center">
            <div className="flex justify-center items-center">
              <Image src={SpinShotlogo} alt="SpinShot logo" />
            </div>
            <div className="font-Poppins font-semibold text-pearl c-md:text-2xl sm:text-lg text-md text-opacity-40">
              Welcome!
            </div>
          </div>
          <div className="flex flex-col lg:space-y-0 space-y-5 justify-center items-center w-[100%] h-[50%]">
            <form
              autoComplete="off"
              className="flex justify-start items-center space-y-5 flex-col"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className="w-full flex justify-center items-center flex-col c-md:space-y-5 space-y-3">
                {SignupArray.map((SignUp, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center sm:w-[67%] w-[70%] c-md:h-[45px] h-[35px]"
                  >
                    <InputBorder
                      inputValue={SignUp.inputValue}
                      setinputValue={SignUp.setinputValue}
                      value={SignUp.value}
                      setisValid={SignUp.setisValid}
                      setisMatch={SignUp.setisMatch}
                      ConfirmPassword={SignUp.ConfirmPassword}
                      type={SignUp.type}
                      PlaceHolder={SignUp.PlaceHolder}
                      icon={SignUp.icon}
                      Border={SignUp.Border}
                      Color={SignUp.Color}
                      BorderSize={2}
                      Reg={SignUp.Reg}
                    />
                  </div>
                ))}
                <div className="flex justify-center items-center sm:w-[67%] w-[70%] c-md:h-[45px] h-[35px] ">
                  <ConfirmationPassword
                    Password={Password}
                    inputValue={ConfirmPassword}
                    setinputValue={setConfirmPassword}
                    value={ConfirmPassword}
                    setisValid={setisValid}
                    setisMatch={setisMatch}
                    type="password"
                    PlaceHolder="Confirm Password"
                    icon={lock}
                    Border="#FEECFC40"
                    Color="transparent"
                    BorderSize={2}
                    Reg={/^.{6,}$/}
                  />
                </div>
                {ConfirmPassword && !isMatch && (
                  <div className="text-[#FF000060] c-md:text-xl sm:text-md font-Poppins">
                    Password do not match
                  </div>
                )}
              </div>
              <div className="w-full flex justify-center items-center rounded-full">
                <SimpleButton
                  Type="submit"
                  onclick={(e) => RedirectionFunction(e, "/Signin")}
                  content="Sign up"
                />
              </div>
            </form>
          </div>
        </div>
        <div>
          {widthsc && widthsc <= 650 && (
            <div className="w-full  flex flex-row justify-center items-center space-x-1">
              <p className="font-Poppins font-normal text-pearl text-opacity-40 c-md:text-lg sm:text-md text-xs">
                Already have an account?
              </p>
              <EmptyButton
                onclick={(e) => RedirectSignin(e)}
                content="Sign in"
              />
            </div>
          )}
        </div>
      </div>
      {widthsc && widthsc > 650 && (
        <div className="w-full c-md:bg-transparent c-md:backdrop:blur-none backdrop:blur bg-white/10 flex flex-row justify-center items-center space-x-1">
          <p className="font-Poppins font-normal text-pearl text-opacity-40 c-md:text-lg sm:text-md text-xs">
            Already have an account?
          </p>
          <EmptyButton onclick={(e) => RedirectSignin(e)} content="Sign in" />
        </div>
      )}
    </div>
  );
};

export default Signup;
