import SpinShotlogo from "../../../../theme/SpinShotlogo";
import InputBorder from "@/Components/ui/Inputs/InputBorder";
import { useEffect, useState } from "react";
import user from "../../../../../public/user.svg";
import email from "../../../../../public/email.svg";
import lock from "../../../../../public/lock.svg";
import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import ConfirmationPassword from "@/Components/ui/Inputs/ConfirmationPassword";

const RegPassword = /^.{6,}$/;
const RegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RegUsername = /^[a-zA-Z0-9_.]{3,16}$/;

const Signup = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isValid, setisValid] = useState(false);
  const [isMatch, setisMatch] = useState(true);
  const Router = useRouter();
  const SignupArray = [
    {
      id: 0,
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
      Reg: RegUsername,
    },
    {
      id: 1,
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
      Reg: RegEmail,
    },
    {
      id: 2,
      inputValue: Password,
      setinputValue: setPassword,
      value: Password,
      setisValid: setisValid,
      type: "password",
      PlaceHolder: "Password",
      icon: lock,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
      Reg: RegPassword,
    },
  ];

  useEffect(() => {
    if (!Username || !Email || !Password || !ConfirmPassword) setisValid(false);
  }, [isValid]);

  const RedirectionFunction = (
    e: MouseEvent<HTMLButtonElement>,
    Path: string
  ) => {
    e.preventDefault();
    if (isValid && isMatch) Router.push(Path);
  };

  return (
    <div className="c-md:w-[600px] c-md:h-[750px] w-full h-full backdrop:blur bg-white/10 c-md:rounded-2xl rounded-none flex justify-center items-center flex-col space-y-9">
      <div className="flex flex-col justify-center c-md:space-y-5 space-y-3 items-center">
        <div className="flex justify-center items-center">
          <SpinShotlogo />
        </div>
        <div className="font-Poppins font-black text-pearl text-2xl text-opacity-40">
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
          <div className="w-full flex justify-center items-center flex-col c-md:space-y-5 space-y-2">
            {SignupArray.map((SignUp) => (
              <div
                key={SignUp.id}
                className="flex justify-center items-center sm:w-[67%] w-[70%] c-md:h-[45px] h-[35px]"
              >
                <InputBorder
                  inputValue={SignUp.inputValue}
                  setinputValue={SignUp.setinputValue}
                  value={SignUp.value}
                  setisValid={SignUp.setisValid}
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
                Reg={RegPassword}
              />
            </div>
            {isValid && !isMatch && (
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
  );
};

export default Signup;