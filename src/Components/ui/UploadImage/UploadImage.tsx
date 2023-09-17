import React, { useState } from "react";
import camera from "../../../../public/cameraIcon.svg";
import test1 from "../../../../public/test1.svg";
import { ArrayAvatar } from "../../../Components/ui/DropDown/ArrayIcon";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Option,
} from "@material-tailwind/react";
import test from "node:test";

const TowFactor = (props: { upload: boolean; Switch: Function }) => {
  const handleOpen = () => props.Switch(!open);
  const data = [1, 2, 3, 4, 5, 6];
  const a = useState("123456");
  console.log("open: ", props.upload);

  return (
    <>
      <Dialog
        open={props.upload}
        handler={handleOpen}
        size="xs"
        className="bg-pearl border border-black "
      >
        <DialogHeader className="flex flex-col  items-center justify-center ">
          <Image src={camera} alt="" />
          <span>Change picture</span>
        </DialogHeader>
        <DialogBody className="text-very-dark-purple h-[30rem]  flex flex-col">
          <Typography className="font-normal flex flex-col items-start space-y-5 ">
            <span>Chose your picture</span>
            <div className="flex items-center justify-center w-full">
              <button
                className=" bg-peridot rounded-full w-28 h-9"
                // onClick={}
              >
                <span className=" font-Passion-One text-lg">
                  Upload
                </span>
              </button>
            </div>
            <span>Use avatar</span>
            <div className=" overflow-y-auto h-52 w-[95%] bg-very-dark-purple  flex flex-wrap space-x-5 space-y-5 rounded-[20px] ">
              {ArrayAvatar.map((option: any) => (
                <div key={option.id} className="">
                  <Image src={option.icon} alt="" />
                </div>
              ))}
            </div>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-3">
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
