"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PinInput from "react-pin-input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import ip from "@/utils/endPoint";

const TwoFactor = (props: { isActive: boolean; Switch: Function }) => {
  const [size, setSize] = useState<number>();
  const [width, setWidth] = useState(0);
  const [submittedCode, setSubmittedCode] = useState<string>("");
  const [qrCode, setQrCode] = useState<any>(undefined);
  let ele: any = useRef();
  const token = localStorage.getItem("token");
  useEffect(() => {
    handleResize();
    fetchQrCode();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const fetchQrCode = async () => {
    try {
      const res = await axios.post(
        `${ip}/2fa/generate-qr`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([res.data], { type: "image/png" });
      setQrCode(URL.createObjectURL(blob));
    } catch (e) {
      console.log(e);
      toast.error("Qr Cannot Be Generated");
    }
  };
  const handleResize = () => {
    {
      window.innerWidth > 540 ? setSize(250) : setSize(150);
    }
    {
      window.innerWidth > 540 ? setWidth(50) : setWidth(30);
    }
  };

  const handleOpen = () => props.Switch(!open);
  const handleClose = () => props.Switch(!open);
  const handleVerify = async () => {
    try {
      const res = await axios.post(
        `${ip}/2fa/turn-on-qr`,
        {
          code: submittedCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("2FA is now enabled");
      props.Switch(!open);
    } catch (e: any) {
      ele.clear();
      toast.error(e?.data ?? "Invalid 2FA");
    }
  };
  return (
    <>
      <Dialog
        open={props.isActive}
        handler={handleOpen}
        size="xs"
        className="bg-pearl"
      >
				<Toaster reverseOrder={false} ></Toaster>
        <DialogHeader className="flex flex-col items-center justify-center sm:space-y-5 ">
          <span className="text-3xl sm:text-3xl text-very-dark-purple ">
            Authenticate your account
          </span>
        </DialogHeader>
        <DialogBody className="sm:h-[35rem] overflow-hidden  flex flex-col items-center justify-center">
          <div className="font-normal flex flex-col items-center justify-center sm:space-y-10">
            <div className="border-[15px] border-white rounded-2xl">
              <Image src={qrCode} alt="the qr code" width={200} height={200} />
            </div>
            <div className="flex flex-row  space-x-5 sm:px-5 ">
              <PinInput
                ref={(n: any) => (ele = n)}
                length={6}
                initialValue=""
                // onChange={(value, index) => {}}
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
                onComplete={(value, _) => {
                  setSubmittedCode(value);
                }}
                autoSelect={true}
                // regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-3">
          <button
            className="text-very-dark-purple border-none"
            onClick={handleClose}
          >
            <span className="font-Passion-One text-lg">close</span>
          </button>
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={handleVerify}
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

export default TwoFactor;
