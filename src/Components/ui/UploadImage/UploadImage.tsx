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


const UploadImage = (props: {upload:boolean, setUpload:Function, open: boolean, Switch: Function, uploadToClient:any }) => {
  const handleOpen = () => {
    props.Switch(!open);
    props.setUpload(!props.upload);
  };
  const data = [1, 2, 3, 4, 5, 6];
  const handleImage = () => {
    console.log("click");
  }
  return (
    <div className="">
      <Dialog
        open={props.open}
        handler={handleOpen}
        size="xs"
        className="bg-pearl"
      >
        <DialogHeader className="flex flex-col  items-center justify-center ">
          <Image src={camera} alt="" />
          <span>Change picture</span>
        </DialogHeader>
        <DialogBody className="text-very-dark-purple h-[30rem]  flex flex-col">
          <Typography className="font-normal flex flex-col items-start space-y-5 ">
            <span>Chose your picture</span>
            <label className="flex items-center justify-center w-full">
              <input type="file" className="  w-full h-9  hidden" onChange={props.uploadToClient}/>
                <span className=" font-Passion-One text-lg bg-peridot rounded-full flex items-center justify-center w-28 h-9  ">
                  Upload
                </span>
            </label>
            <span>Use avatar</span>
            <div className="  overflow-y-auto h-52 w-[100%]  rounded-[20px] ">
              <div className="flex  flex-wrap  bg-very-dark-purple items-center px-2">

              {ArrayAvatar.map((option: any) => (
                <label key={option.id} className="py-2 px-1 relative flex items-center justify-center">
                  <input type="image" className="border w-full h-full absolute hidden " onClick={handleImage}/>
                  <Image src={option.icon} alt="" className=""/>
                </label>
              ))}
              </div>
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
    </div>
  );
};

export default UploadImage;
