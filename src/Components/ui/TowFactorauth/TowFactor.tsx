import React, { useState } from "react";
import QRCode from "react-qr-code";
import OtpVerification from "../Inputs/OtpVerification";
import scanne from "../../../../public/scanne.svg";
import CodeQR from "../../../../public/CodeQR.svg";
import Image from "next/image";
import PinInput from "react-pin-input";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const TowFactor = (props: { isActive: boolean; Switch: Function }) => {
  const handleOpen = () => props.Switch(!open);
  const data = [1, 2, 3, 4, 5, 6];
  function generateRandomCode() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }

  return (
    <>
      <Dialog
        open={props.isActive}
        handler={handleOpen}
        size="xs"
        className="bg-pearl"
      >
        <DialogHeader className="flex flex-col items-center justify-center space-y-5">
          <Image src={scanne} alt="" />
          <span className="text-sm md:text-3xl text-very-dark-purple ">
            Authenticate your account
          </span>
        </DialogHeader>
        <DialogBody className="h-[35rem] overflow-scroll  flex flex-col items-center justify-center ">
          <Typography className="font-normal flex flex-col items-center justify-center space-y-10">
            <div className="border-[15px] border-white rounded-2xl">
              <QRCode value={generateRandomCode()}/>
            </div>
            <div className="flex flex-row border space-x-5 px-5">
              {/* {data.map((index)=>(
                <div key={index} className="h-[60px] ">
                  <OtpVerification />
                </div>
              ))} */}
              <PinInput
                length={6}
                initialValue=""
                // secret
                // secretDelay={100}
                onChange={(value, index) => {}}
                type="numeric"
                inputMode="number"
                style={{ 
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
               }}
                inputStyle={{ 
                  border:"4px solid",
                  borderColor: "black",
                  borderRadius:"20px",
                  width:"15%",
                  height:"80px",
                }}
                inputFocusStyle={{ borderColor: "blue" }}
                onComplete={(value, index) => {}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </div>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-3">
          <button
            className="text-very-dark-purple border-none"
            onClick={handleOpen}
          >
            <span className="font-Passion-One text-lg">close</span>
          </button>
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={handleOpen}
          >
            <span className="text-very-dark-purple font-Passion-One text-lg">
              Verify
            </span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default TowFactor;
