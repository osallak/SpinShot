import React, { use, useEffect } from "react";
import test1 from "./../../../../public/test1.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../../../redux_tool";
import { useRouter } from "next/router";
import parseJwt from "@/utils/parsJwt";
import { getProfile } from "../../../../redux_tool/redusProfile/profileThunk";

const NavGame = (props: any) => {
  const data = useAppSelector((state) => state.Profile);
  const dispatch = useAppDispatch();
  const router = useRouter();


  const getData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
    try {
      await dispatch(getProfile(parseJwt(JSON.stringify(token)).sub)).unwrap();
    } catch (error) {
      // console.log(error);
      return;
    }
  };
  console.log("data", props?.dataOpponent);

  useEffect(() => {
    getData();
  }, [props?.score]);
  useEffect(() => {

  }, [props?.dataOpponent]);


  return (
    <div className=" text-pearl  w-[70%]  bg-very-dark-purple rounded-xl sm:rounded-3xl flex justify-between flex-row items-center px-[2%] absolute top-24 md:top-6 p-3 ">
      <div className="flex flex-row justify-between items-center w-[100%] sm:w-[30%]">
        <h1 className="text-md sm:text-3xl">me</h1>
        <h1 className=" text-sm sm:text-2xl">{props?.score?.userScore ?? 0}</h1>
      </div>
      <div className="text-xl px-3">:</div>
      <div className="flex flex-row justify-between items-center w-[100%] sm:w-[30%]">
        <h2 className="text-sm sm:text-2xl">{props?.score?.opponentScore ?? 0}</h2>
        <h1 className="text-md sm:text-3xl">op</h1>
      </div>

    </div>
  );
};

export default NavGame;
