"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ip from "@/utils/endPoint";
import parseJwt from "@/utils/parsJwt";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { globalToken } from "../context/recoilContext";
import { store } from "../../../redux_tool";
import { updateAuthStatus } from "../../../redux_tool/redusProfile/profileSlice";

const WaitingPage = () => {
  const router = useRouter();
  const [tmpToken, setTmpToken] = useRecoilState(globalToken);

  const code = router.query.code;
  const fetchData = async () => {
    if (!code) return;
    try {
      const res = await axios.get(`${ip}/auth/42?code=${code}`);
      setTmpToken(res?.data?.token);
      const token = parseJwt(res?.data?.token);
      if (token.isTwoFactorEnabled === true) {
        router.push("/twoFactorAuthentication");
      } else {

        store.dispatch(updateAuthStatus(true));
        localStorage.setItem("token", res?.data?.token);
        router.push(`/profile/${token.sub}`);
      } 
    } catch (error: any) {
      router.push("/signin");
    }
  };
  useEffect(() => {
    if (!code) return;
    fetchData();
  }, [code]);

  return (
    <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-col justify-center items-center font-Poppins text-pearl font-bold">
      Wait...
    </div>
  );
};

export default WaitingPage;
