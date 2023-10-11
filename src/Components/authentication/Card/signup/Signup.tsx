import InputBorder from "@/Components/ui/inputs/InputBorder";
import { useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import user from "../../../../../public/user.svg";
import mail from "../../../../../public/email.svg";
import lock from "../../../../../public/lock.svg";
import SpinShotlogo from "../../../../../public/SpinShotlogo.svg";
import SimpleButton from "@/Components/ui/buttons/simpleButton";
import { useRouter } from "next/router";
import ConfirmationPassword from "@/Components/ui/inputs/confirmationPassword";
import EmptyButton from "@/Components/ui/buttons/emptyButton";
import axios from "axios";
import ip from "@/endpoint/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isValid, setisValid] = useState(false);
  const [isMatch, setisMatch] = useState(true);
  const [widthsc, setwidthsc] = useState<number | undefined>(undefined);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const Router = useRouter();
  const SignupArray = [
    {
      inputValue: username,
      setinputValue: setUsername,
      value: username,
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
      inputValue: email,
      setinputValue: setEmail,
      value: email,
      setisValid: setisValid,
      type: "email",
      PlaceHolder: "Email",
      icon: mail,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
      Reg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    {
      inputValue: password,
      setinputValue: setPassword,
      value: password,
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

  const redirection = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Router.push("/Signin");
  };

  const RedirectionFunction = async (
    e: MouseEvent<HTMLButtonElement>,
    Path: string
  ) => {
    e.preventDefault();
    if (isValid && isMatch) {
      try {
        await axios.post(`${ip}/auth/signup/local`, {
          email,
          username,
          password,
        });
        Router.push(Path);
      } catch (error: any) {
        setErrorMessage(error?.response?.data?.message);
        setError(true);
        console.log("error from signup: ", error);
      }
    }
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
    if (!username || !email || !password || !ConfirmPassword || !isMatch)
      setisValid(false);
  }, [isValid, username, email, password, ConfirmPassword, isMatch]);

  return (
    <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-col justify-center items-center ">
      <div
        className={`fl:w-[600px] fl:h-[700px] w-full h-full backdrop:blur bg-white/10 fl:rounded-2xl rounded-none flex justify-center items-center flex-col space-y-9`}
      >
        <div className="w-full flex items-center justify-center flex-col fl:space-y-5 space-y-6">
          <div className="flex fl:pb-16 flex-col justify-center fl:space-y-5 space-y-3 items-center">
            <div className="flex justify-center items-center">
              <Image src={SpinShotlogo} alt="SpinShot logo" />
            </div>
            <div className="font-Poppins font-semibold text-pearl fl:text-2xl sm:text-lg text-md text-opacity-40">
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
                <div className="flex justify-center items-center sm:w-[67%] w-[70%] c-md:h-[45px] h-[35px]">
                  <ConfirmationPassword
                    Password={password}
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
                  <div className="text-red-900 h-[5px] text-sm font-Poppins">
                    Password do not match
                  </div>
                )}
                {error && (
                  <div className="text-red-900 h-[5px] text-sm font-Poppins">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="w-full flex justify-center items-center rounded-full">
                <div className="b-sm:w-40 w-3/4 c-md:h-10 sm:h-10 h-9 flex justify-center items-center rounded-full">
                  <SimpleButton
                    Type="submit"
                    onclick={(e) => RedirectionFunction(e, "/Signin")}
                    content="Sign up"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          {widthsc && widthsc <= 1024 && (
            <div className="w-full  flex flex-row justify-center items-center space-x-1">
              <p className="font-Poppins font-normal text-pearl text-opacity-40 c-md:text-lg sm:text-md text-xs">
                Already have an account?
              </p>
              <EmptyButton
                flag="authentication"
                onclick={(e) => redirection(e)}
                content="Sign In"
              />
            </div>
          )}
        </div>
      </div>
      {widthsc && widthsc > 1024 && (
        <div className="w-full c-md:bg-transparent c-md:backdrop:blur-none backdrop:blur bg-white/10 flex flex-row justify-center items-center">
          <p className="font-Poppins font-normal text-pearl text-opacity-40 c-md:text-lg sm:text-md text-xs">
            Already have an account?&nbsp;
          </p>
          <EmptyButton
            flag="authentication"
            onclick={(e) => redirection(e)}
            content="Sign In"
          />
        </div>
      )}
    </div>
  );
};

export default Signup;
