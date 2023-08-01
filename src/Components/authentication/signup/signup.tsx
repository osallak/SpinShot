import SpinShotlogo from "../../../../public/SpinShotlogo.svg";
import Image from "next/image";
import InputBorder from "@/Components/ui/Inputs/InputBorder";
import { ChangeEvent, useEffect, useState } from "react";
import user from "../../../../public/user.svg";
import email from "../../../../public/email.svg";
import lock from "../../../../public/lock.svg";
import SimpleButton from "@/Components/ui/Buttons/SimpleButton";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { FormEvent } from "react";
import ConfirmationPassword from "@/Components/ui/Inputs/ConfirmationPassword";

const RegPassword = /^.{6,}$/;
const RegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RegUsername = /^[a-zA-Z0-9_.]{3,16}$/;

const Signup: React.FC = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isValid, setisValid] = useState(false);
  const [next, setnext] = useState(0);
  const [isReg, setisReg] = useState(true);
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
      isReg: isReg,
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
      isReg: isReg,
    },
    {
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
      isReg: isReg,
    },
  ];

  const RedirectionFunction = (
    e: MouseEvent<HTMLButtonElement>,
    Path: string
  ) => {
    e.preventDefault();
    isValid ? Router.push(Path) : "";
  };

  const HandleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Username === "") setisValid(false);
    else setisValid(true);
    e.persist();
    setUsername(e.currentTarget.value);
    const Reg = Username.match(RegUsername);
    if (!Reg) setisReg(false);
    else setisReg(true);
  };

  const HandleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Email === "") setisValid(false);
    else setisValid(true);
    e.preventDefault();
    e.persist();
    setEmail(e.currentTarget.value);
    // const Reg = Email.match(RegEmail);
    // if (!Reg) setisReg(false)
    // else setisReg(true)
  };

  const HandlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Password === "") setisValid(false);
    else setisValid(true);
    e.preventDefault();
    e.persist();
    setPassword(e.currentTarget.value);
    // const Reg = Password.match(RegPassword);
    // if (!Reg) setisReg(false)
    // else setisReg(true)
  };

  const HandleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (ConfirmPassword === "") setisValid(false);
    else setisValid(true);
    e.preventDefault();
    e.persist();
    setConfirmPassword(e.currentTarget.value);
    console.log("Password: " + Password);
    console.log("ConfirmPassword: " + ConfirmPassword);
    if (ConfirmPassword !== Password) {
      setisValid(false);
    } else setisValid(true);
    console.log(isValid);
  };

  const HandleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  const renderedObjects = [];

  return (
    <div className="sm:w-[600px] sm:h-[750px] w-full h-full backdrop:blur bg-white/10 sm:rounded-2xl rounded-none flex justify-center items-center flex-col md:space-y-9 space-y-5">
      <div className="flex flex-col justify-center md:space-y-5 space-y-3 border-yellow-500 items-center">
        <div className="flex justify-cente border-gray-500 items-center">
          <svg
            className="mini"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.99">
              <ellipse
                cx="14.825"
                cy="14.57"
                rx="14.825"
                ry="14.57"
                transform="matrix(0.697621 0.716467 -0.68158 0.731744 58.2615 0)"
                fill="#D8EA10"
              />
              <path
                d="M70.1396 41.4243C76.2156 47.6644 79.7649 56.0944 80.0067 64.8598C80.2485 73.6252 77.1631 82.0079 71.4291 88.1639C67.9472 91.9022 63.7904 94.5362 59.3291 96.0736L59.6612 108.194C59.6865 109.116 59.3617 109.999 58.7583 110.646C58.1548 111.294 57.3221 111.655 56.4432 111.649L43.1875 111.554C42.7519 111.551 42.3181 111.458 41.9108 111.281C41.5036 111.103 41.1308 110.844 40.8139 110.519C40.497 110.193 40.2421 109.808 40.0639 109.384C39.8857 108.96 39.7876 108.507 39.7752 108.05L39.4409 95.9319C34.751 94.2788 30.456 91.5098 26.8996 87.8467C20.8236 81.6066 17.2743 73.1766 17.0325 64.4112C16.7907 55.6458 19.8761 47.2631 25.6101 41.1071C31.3441 34.9511 39.2569 31.5261 47.6078 31.5856C55.9587 31.6451 64.0636 35.1842 70.1396 41.4243ZM52.4597 87.2688L45.8318 87.2216L46.3141 104.616L52.9419 104.663L52.4597 87.2688ZM70.8484 76.9691L26.8627 76.6557C28.091 78.9751 29.6377 81.1003 31.4512 82.9602C33.7094 85.2853 36.3492 87.1597 39.2331 88.4855L39.1057 83.6984C39.0804 82.7759 39.4052 81.8937 40.0086 81.2459C40.6121 80.598 41.4448 80.2375 42.3237 80.2436L55.5794 80.338C56.4583 80.3444 57.3112 80.717 57.9507 81.3737C58.5901 82.0304 58.9637 82.9176 58.9893 83.8401L59.126 88.6272C61.9379 87.3419 64.4753 85.5045 66.6061 83.2106C68.363 81.3244 69.774 79.2168 70.8484 76.9691ZM65.588 46.3109C61.7003 42.3172 56.7334 39.6993 51.4238 38.8452C46.1143 37.991 40.7448 38.9462 36.1114 41.5691C31.478 44.1919 27.8274 48.3428 25.701 53.4063C23.5745 58.4697 23.0853 64.1762 24.3059 69.6796L73.0212 70.0266C73.7282 65.8067 73.4192 61.4311 72.1219 57.292C70.8246 53.1529 68.5795 49.3798 65.588 46.3109Z"
                fill="#D8EA10"
              />
              <path
                d="M92.8636 41.4243C98.9396 47.6644 102.489 56.0944 102.731 64.8598C102.973 73.6252 99.8871 82.0079 94.1531 88.1639C90.6712 91.9022 86.5144 94.5362 82.0531 96.0736L82.3852 108.194C82.4105 109.116 82.0857 109.999 81.4823 110.646C80.8788 111.294 80.0461 111.655 79.1672 111.649L65.9115 111.554C65.4759 111.551 65.0421 111.458 64.6348 111.281C64.2276 111.103 63.8548 110.844 63.5379 110.519C63.221 110.193 62.9661 109.808 62.7879 109.384C62.6097 108.96 62.5116 108.507 62.4992 108.05L62.1649 95.9319C57.475 94.2788 53.18 91.5098 49.6236 87.8467C43.5476 81.6066 39.9983 73.1766 39.7565 64.4112C39.5147 55.6458 42.6001 47.2631 48.3341 41.1071C54.0681 34.9511 61.9809 31.5261 70.3318 31.5856C78.6827 31.6451 86.7876 35.1842 92.8636 41.4243ZM75.1837 87.2688L68.5558 87.2216L69.0381 104.616L75.6659 104.663L75.1837 87.2688ZM93.5724 76.9691L49.5867 76.6557C50.815 78.9751 52.3617 81.1003 54.1752 82.9602C56.4334 85.2853 59.0732 87.1597 61.9571 88.4855L61.8297 83.6984C61.8044 82.7759 62.1292 81.8937 62.7326 81.2459C63.3361 80.598 64.1688 80.2375 65.0477 80.2436L78.3034 80.338C79.1823 80.3444 80.0352 80.717 80.6747 81.3737C81.3141 82.0304 81.6877 82.9176 81.7133 83.8401L81.85 88.6272C84.6619 87.3419 87.1993 85.5045 89.3301 83.2106C91.087 81.3244 92.498 79.2168 93.5724 76.9691ZM88.312 46.3109C84.4243 42.3172 79.4574 39.6993 74.1478 38.8452C68.8383 37.991 63.4688 38.9462 58.8354 41.5691C54.202 44.1919 50.5514 48.3428 48.425 53.4063C46.2985 58.4697 45.8093 64.1762 47.0299 69.6796L95.7452 70.0266C96.4522 65.8067 96.1432 61.4311 94.8459 57.292C93.5486 53.1529 91.3035 49.3798 88.312 46.3109Z"
                fill="#D8EA10"
              />
            </g>
          </svg>
        </div>
        <div className="font-Poppins font-black text-pearl text-2xl text-opacity-40  border-blue-500">
          Welcome!
        </div>
      </div>
      <div className="flex flex-col  border-green-500 lg:space-y-0 space-y-5 justify-center items-center w-[100%] h-[50%]">
        <form
          autoComplete="off"
          className="flex justify-start items-center space-y-8 flex-col border-red-500"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div className=" border-green-500 w-full flex justify-center items-center flex-col sm:space-y-5 space-y-3">
            {SignupArray.map((SignUp) => (
              <div className="flex justify-center items-center lg:w-[67%] w-[70%] sm:h-[45px] h-[35px]">
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
                  isReg={SignUp.isReg}
                />
              </div>
            ))}
          </div>
          <div className="rounded-ful">
            <SimpleButton
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
