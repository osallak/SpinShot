"use client";
import { globalToken } from "@/Components/context/recoilContext";
import ContinueWithIntra from "@/Components/ui/Buttons/continueWithIntra";
import EmptyButton from "@/Components/ui/Buttons/emptyButton";
import SimpleButton from "@/Components/ui/Buttons/simpleButton";
import InputBorder from "@/Components/ui/Inputs/inputBorder";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SpinShotlogo from "../../../../public/SpinShotlogo.svg";
import lock from "../../../../public/lock.svg";
import mail from "../../../../public/mail.svg";
import { store, useAppSelector } from "../../../../redux_tool";
import { updateAuthStatus } from "../../../../redux_tool/redusProfile/profileSlice";

const Signin = () => {
  const [username, setUsername] = useState("");
  const auth_status = useAppSelector((state) => state.Profile.auth_status);
  const [password, setPassword] = useState("");
  const [isValid, setisValid] = useState(true);
  const [widthsc, setwidthsc] = useState<number | undefined>(undefined);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const Router = useRouter();
  const SigninArray = [
    {
      inputValue: username,
      setinputValue: setUsername,
      Value: username,
      setisValid: setisValid,
      type: "text",
      PlaceHolder: "Username",
      icon: mail,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
    },
    {
      inputValue: password,
      setinputValue: setPassword,
      Value: password,
      setisValid: setisValid,
      type: "password",
      PlaceHolder: "Password",
      icon: lock,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
    },
  ];
  const [tmpToken, setTmpToken] = useRecoilState(globalToken);

  const RedirectionFunction = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/local/signin`, {
        username,
        password,
      });
      const token = parseJwt(res?.data?.token);
      setTmpToken(res?.data?.token);
      if (token.isTwoFactorEnabled === true) {
        Router.push("/twoFactorAuthentication");
      } else if (token.isTwoFactorEnabled === false) {
        localStorage.setItem("token", res?.data?.token);
        // saveState(true);
        store.dispatch(updateAuthStatus(true));
        Router.push(`/profile/${token.sub}`);
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message);
      if (error?.response?.status === 404) setErrorMessage("User not Found");
      setError(true);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      RedirectionFunction(event);
    }
  };

  const ContinueIntra = async (e: MouseEvent<HTMLButtonElement>) => {
    // console.log("intra:", process.env.NEXT_PUBLIC_INTRA);
    e.preventDefault();
    Router.push(
      `${process.env.NEXT_PUBLIC_INTRA}`
    );
  };

  const redirection = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Router.push("/signup");
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
    const parsed = parseJwt(JSON.stringify(tmpToken));
    if (auth_status && localStorage.getItem("token") && parsed && (parsed.isTwoFactorEnabled === false || parsed.isTwoFaAuthenticated)) {
      Router.push(`/profile/${parseJwt(JSON.stringify(tmpToken)).sub}`);
    }
  }, [auth_status])

  return (
    <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-col justify-center items-center ">
      <div className="fl:w-[600px] fl:h-[700px] w-full h-full backdrop:blur bg-white/10 fl:rounded-2xl rounded-none flex justify-center items-center flex-col space-y-[2px]">
        <div className="w-full flex items-center justify-center flex-col fl:space-y-9 space-y-6">
          <div className="flex fl:pb-14 flex-col justify-center fl:space-y-5 space-y-3 items-center">
            <div className="flex justify-center items-center">
              <Image
                width={500}
                height={500}
                priority={true}
                className="c-md:w-[75px] w-[60px] c-md:h-[120px] h-[105px]"
                src={SpinShotlogo}
                alt="SpinShot logo"
              />
            </div>
            <div className="font-Poppins font-semibold text-pearl fl:text-2xl sm:text-lg mc:text-md text-xs text-opacity-40">
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
              <div className=" flex justify-center items-center c-md:space-y-3 space-y-1 flex-col w-full h-full">
                <div className="flex justify-center items-center w-full h-full flex-col c-md:space-y-5 space-y-3">
                  {SigninArray.map((SignIn, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center sm:w-[67%] w-[70%] md:h-[45px] h-[35px]"
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
                        handleKeyPress={(event) => handleKeyPress(event)}
                      />
                    </div>
                  ))}
                </div>
                {error && (
                  <div className="text-red-900 h-[5px] font-Poppins text-sm">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="w-full flex justify-center items-center flex-col sm:space-y-12 space-y-8">
                <div className="w-full flex justify-center items-center rounded-full">
                  <div className="b-sm:w-40 w-3/4 c-md:h-10 sm:h-10 h-9 flex justify-center items-center rounded-full">
                    <SimpleButton
                      Type="submit"
                      onclick={(e) => RedirectionFunction(e)}
                      content="Sign in"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center c-md:space-y-10 space-y-3 w-full">
                  <div className="flex justify-center items-center pt-10 flex-row space-x-5 w-full">
                    <div className="border w-[50%] border-pearl border-opacity-40"></div>
                    <p className="font-Passion-One text-pearl text-opacity-40">
                      Or
                    </p>
                    <div className="border w-[50%] border-pearl border-opacity-40"></div>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <ContinueWithIntra
                      onclick={(e) => ContinueIntra(e)}
                      content="Continue With Intra"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          {widthsc && widthsc <= 1024 && (
            <div className="w-full flex flex-row justify-center items-center space-x-1">
              <p className="font-Poppins font-normal text-pearl text-opacity-40 c-md:text-lg sm:text-md text-xs">
                Don&apos;t have an account?
              </p>
              <EmptyButton
                flag="authentication"
                onclick={(e) => redirection(e)}
                content="Sign Up"
              />
            </div>
          )}
        </div>
      </div>
      {widthsc && widthsc > 1024 && (
        <div className="w-full c-md:bg-transparent c-md:backdrop:blur-none backdrop:blur flex flex-row justify-center items-center">
          <p className="font-Poppins font-normal text-pearl text-opacity-40 c-md:text-lg sm:text-md text-xs">
            Don&apos;t have an account?&nbsp;
          </p>
          <EmptyButton
            flag="authentication"
            onclick={(e) => redirection(e)}
            content="Sign Up"
          />
        </div>
      )}
    </div>
  );
};

export default Signin;
