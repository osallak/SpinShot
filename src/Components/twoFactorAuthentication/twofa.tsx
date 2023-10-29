"use client";
import PinInput from "react-pin-input";
import parseJwt from "@/utils/parsJwt";
import Router, { useRouter } from "next/router";
import axios from "axios";
import ip from "@/utils/endPoint";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { globalToken } from "../context/recoilContext";
import { store } from "../../../redux_tool";
import { updateAuthStatus } from "../../../redux_tool/redusProfile/profileSlice";

const Twofa = () => {
  const Router = useRouter();
  const [error, setError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [tmpToken, setTmpToken] = useRecoilState(globalToken);

  const sendCode = async (entredValue: string) => {
    try {
      const res = await axios.post(
        `${ip}/2fa/authenticate`,
        { code: entredValue },
        {
          headers: {
            Authorization: `Bearer ${tmpToken}`,
          },
        }
      );
      localStorage.setItem("token", res?.data?.token);
      const token = localStorage.getItem("token");
      if (!token) {
        Router.push("/signin");
        return;
      }
      store.dispatch(updateAuthStatus(true));
      const jwtToken = parseJwt(token);
      Router.push(`/profile/${jwtToken.sub}`);
    } catch (error: any) {
      // console.log(error);
      setErrorMessage("wrong code");
      setError(false);
    }
  };

  return (
    <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-col justify-center items-center ">
      <p className="text-pearl font-Poppins font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-base text-xs">
        Enter the code from google authenticator
      </p>
      <PinInput
        length={6}
        initialValue=""
        secret
        secretDelay={100}
        onChange={(value, index) => {}}
        type="numeric"
        inputMode="number"
        style={{ padding: "10px" }}
        inputStyle={{
          color: "rgb(254, 236, 252)",
          fontFamily: "Poppins",
          fontWeight: "bold",
          borderColor: "transparent",
          borderRadius: "10px",
          backgroundColor: "#ffffff30",
        }}
        inputFocusStyle={{ borderColor: "transparent" }}
        onComplete={(entredValue, index) => {
          sendCode(entredValue);
        }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      {error === false && <p className="font-Poppins text-red-900 text-base">{errorMessage}</p>}
    </div>
  );
};

export default Twofa;
