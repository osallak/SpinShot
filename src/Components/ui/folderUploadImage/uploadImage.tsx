"use client";
import React, { useRef, useState } from "react";
import camera from "../../../../public/cameraIcon.svg";
import test1 from "../../../../public/test1.svg";
// import { ArrayAvatar } from "../FolderDropDown/ArrayIcon";
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
import axios from "axios";
import ip from "@/utils/endPoint";
import { useRouter } from "next/router";

const UploadImage = (props: {
  upload: boolean;
  setUpload: Function;
  open: boolean;
  Switch: Function;
}) => {
  const [image, setMyImage] = useState<any | null>(null);
  const imageRef = useRef(null);
  const router = useRouter()

  const handleOpen = () => {
    props.Switch(!open);
    // props.setUpload(!props.upload);
  };

  const handleImage = (image: any) => {
    setMyImage(image);
  };

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setMyImage((prev: any) => event.target.files[0]);
    }
  };

  const hendleUpdata = async () => {
    props.Switch(!open);
    try {
      const token = localStorage.getItem("token");
      if (!token)
      {
        router.push("/signin");
        return ;
      }
        const response = await axios.post(
          `${ip}/media`,
          {
            file: image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <Dialog
        open={props.open}
        handler={handleOpen}
        size="xs"
        className="bg-pearl"
      >
        <DialogHeader className="flex flex-col  items-center justify-center text-md sm:text-3xl">
          <Image src={camera} alt="" />
          <span>Change picture</span>
        </DialogHeader>
        <DialogBody className="text-very-dark-purple sm:h-[30rem]  flex flex-col">
          <div className="font-normal flex flex-col items-start space-y-2 sm:space-y-5 ">
            <span>Chose your picture</span>
            <label className="flex items-center justify-center w-full">
              <input
                type="file"
                className="  w-full h-9  hidden"
                onChange={uploadToClient}
                accept="image/jpeg, image/png, image/jpg"
              />
              <span className=" font-Passion-One text-lg bg-peridot rounded-full flex items-center justify-center w-28 h-9  ">
                Upload
              </span>
            </label>
            <span>Use avatar</span>
            <div className="  overflow-y-auto h-32 sm:h-52 w-[100%]  rounded-[20px] ">
              <div className="flex  flex-wrap justify-center  bg-very-dark-purple items-center px-2">
                {/* {ArrayAvatar.map((option: any) => (
                  <label
                    key={option.id}
                    className="py-2 px-1 relative flex items-center justify-center"
                  >
                    <input
                      type="image"
                      className="border w-full h-full absolute hidden "
                      onClick={() => handleImage(option.icon)}
                    />
                    <Image src={option.icon} alt="" className="" />
                  </label>
                ))} */}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-3">
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={hendleUpdata}
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
