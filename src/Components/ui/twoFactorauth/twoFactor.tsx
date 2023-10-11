import React, { useEffect, useState } from "react";
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
  const [size, setSize] = useState<number>();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleResize = () => {
    {
      window.innerWidth > 540 ? setSize(250) : setSize(150);
    }
    {
      window.innerWidth > 540 ? setWidth(50) : setWidth(30);
    }
  };

  const handleOpen = () => {
    {
      props.isActive == true ? props.Switch(false) : props.Switch(true);
    }
  };
  const handleOpen1 = () => props.Switch(false);

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
        <DialogHeader className="flex flex-col items-center justify-center sm:space-y-5 ">
          <Image src={scanne} alt="" />
          <span className="text-sm sm:text-3xl text-very-dark-purple ">
            Authenticate your account
          </span>
        </DialogHeader>
        <DialogBody className="sm:h-[35rem] overflow-hidden  flex flex-col items-center justify-center ">
          <div className="font-normal flex flex-col items-center justify-center sm:space-y-10">
            <div className="border-[15px] border-white rounded-2xl ">
              <QRCode value={generateRandomCode()} size={size} />
            </div>
            <div className="flex flex-row  space-x-5 sm:px-5 ">
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
                  border: "3px solid",
                  borderColor: "black",
                  borderRadius: "8px",
                  width: `${width}px`,
                  height: `${width}px`,
                }}
                inputFocusStyle={{ borderColor: "blue" }}
                onComplete={(value, index) => {}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-3">
          <button
            className="text-very-dark-purple border-none"
            onClick={handleOpen1}
          >
            <span className="font-Passion-One text-lg">close</span>
          </button>
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={handleOpen1}
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
