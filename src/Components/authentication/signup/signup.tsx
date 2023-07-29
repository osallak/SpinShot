import SpinShotlogo from '../../../../public/SpinShotlogo.svg'
import Image from 'next/image';
import InputBorder from '@/Components/ui/Inputs/InputBorder';
import { useState } from 'react';
import user from '../../../../public/user.svg'
import SimpleButton from '@/Components/ui/Buttons/SimpleButton';
import { useRouter } from "next/router";
import { MouseEvent } from 'react';

const RegPassword = /^.{6,}$/;
const RegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RegUsername = /^[a-zA-Z0-9_.]{3,16}$/;

function Signup() {
  const [isValid, setisValid] = useState(false)
  const Router = useRouter();
  const RedirectionFunction = (e:MouseEvent<HTMLButtonElement>,Path: string) => {
    e.preventDefault()
    isValid ?
    Router.push(Path) : console.log(isValid);
  };
  const [inputValue, setinputValue] = useState("");
  return (
    <div className="md:w-[600px] md:h-[750px] w-full h-full backdrop:blur bg-white/10 md:rounded-2xl rounded-none flex justify-center items-center flex-col" >
      <div className='flex flex-col justify-center space-y-5 items-center'>
        <div className='flex justify-center items-center'>
          <Image src={SpinShotlogo} alt="the logo of SpinShot game"/>
        </div>
        <div className="font-Poppins font-black text-pearl text-2xl text-opacity-40">Welcome!</div>
      </div>
      <div className='flex flex-col lg:space-y-0 space-y-3 justify-center items-center w-[100%] lg:h-[60%] h-[50%]'>
        <form autoComplete='off' className='flex justify-center items-center flex-col space-y-5' style={{
          width: "100%",
          height: "100%"
        }}>
          <div className='flex justify-center items-center lg:w-[67%] w-[70%] lg:h-[45px] h-[50px]'>
            <InputBorder inputValue={inputValue} setinputValue={setinputValue} setisValid={setisValid} type='username' PlaceHolder='Username' icon={user} Border='#FEECFC40' Color='transparent' BorderSize={2} Regexp={RegUsername} />
          </div>
          <div className='flex justify-center items-center lg:w-[67%] w-[70%] lg:h-[45px] h-[50px]'>
            <InputBorder  inputValue={inputValue} setinputValue={setinputValue} setisValid={setisValid} type='email' PlaceHolder='Email' icon={user} Border='#FEECFC40' Color='transparent' BorderSize={2} Regexp={RegEmail} />
          </div>
          <div className='flex justify-center items-center lg:w-[67%] w-[70%] lg:h-[45px] h-[50px]'>
            <InputBorder inputValue={inputValue} setinputValue={setinputValue} setisValid={setisValid} type='password' PlaceHolder='Password' icon={user} Border='#FEECFC40' Color='transparent' BorderSize={2} Regexp={RegPassword} />
          </div>
          <div className='flex justify-center items-center lg:w-[67%] w-[70%] lg:h-[45px] h-[50px]'>
            <InputBorder inputValue={inputValue} setinputValue={setinputValue} setisValid={setisValid} type='password' PlaceHolder='Confirme Password' icon={user} Border='#FEECFC40' Color='transparent' BorderSize={2} Regexp={RegPassword} />
          </div>
        </form>
          <div className='bg-white rounded-full'>
            <SimpleButton onclick={(e) => RedirectionFunction(e, "/Signin")} content='Sign up' />
          </div>
      </div>
    </div>
  );
}

export default Signup;
