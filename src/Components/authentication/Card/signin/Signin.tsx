import { useRouter } from "next/router";
import lock from "../../../../../public/lock.svg"
import email from "../../../../../public/email.svg"
import SpinShotlogo from "../../../../theme/SpinShotlogo";
import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import { MouseEvent, useState } from "react";

const Signin = () => {
  const [Username, setUsername] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const Router = useRouter();
  const SigninArray = [
    {
      id: 0,
      inputValue: Username || Email,
      setinputValue: setUsername || setEmail,
      Value: Username || Email,
      type: "text",
      PlaceHolder: "Username or Email",
      icon: email,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
    },
    {
      id: 0,
      inputValue: Password,
      setinputValue: setPassword,
      Value: Password,
      type: "password",
      PlaceHolder: "Password",
      icon: lock,
      Border: "#FEECFC40",
      Color: "transparent",
      BorderSize: 2,
    }
  ];

  const RedirectionFunction = (
    e: MouseEvent<HTMLButtonElement>,
    Path: string
  ) => {
    e.preventDefault();
    Router.push(Path);
  };
  
  return (
    <div className="c-md:w-[600px] c-md:h-[750px] w-full h-full backdrop:blur bg-white/10 c-md:rounded-2xl rounded-none flex justify-center items-center flex-col space-y-9">
      <div className="flex flex-col justify-center c-md:space-y-5 space-y-3 items-center">
        <div className="flex justify-center items-center">
          <SpinShotlogo />
        </div>
        <div className="font-Poppins font-black text-pearl text-2xl text-opacity-40">
          Welcome Back!
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
                {SigninArray.map((SignIn) => (
                  <div
                    key={SignIn.id}
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
              <div className="w-full flex justify-center items-center rounded-full">
                <SimpleButton
                  Type="submit"
                  onclick={(e) => RedirectionFunction(e, "/PersonalInformation")}
                  content="Sign up"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
  )
};

export default Signin
