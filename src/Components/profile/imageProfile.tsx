import ibenmain from "./../../../public/ibenmain.jpeg";
import avatar from "./../../../public/test1.svg";
import email from "./../../../public/Email.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux_tool";
import UploadImage from "../ui/UploadImage/UploadImage";

const ImageProfile = (props: any) => {
  const [handelMous, setImage] = useState(false);

  const [upload, setUpload] = useState(false);
  const [image, setMyImage] = useState();
  const data = useAppSelector((state) => state.Profile);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const handleMouseEnter = () => {
    setImage(true);
  };

  const handleMouseLeave = () => {
    setImage(false);
  };

  const Open = () => {
    // setUpload(false);
    props.setOpenDialog(!props.open);
  };

  const handleImageLoad = (event: any) => {
    const { naturalWidth, naturalHeight } = event.target;
    setWidth(naturalWidth);
    setHeight(naturalHeight);
  };

  useEffect(() => {
    if (data.profile?.profile?.avatar) {
      const img = data.profile?.profile?.avatar;
      setMyImage(img);
    }
  }, [data]);

  return (
    <div
      className={` ${
        props.opne && props.width < 1024 ? "opacity-10" : ""
      }  rounded-[20px] flex flex-col items-center justify-center text-pearl text-opacity-40 w-full ${
        props.isopen ? "pt-20 p-12" : "p-20"
      } c-gb:w-[30%]   relative  overflow-hidden`}
    >
      {handelMous && (
        <div className=" flex justify-center items-center flex-col  transition-all absolute ">
          <Image className={``} src={email} alt="" />
        </div>
      )}
      <label
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={` rounded-3xl  ${
          props.isopen ? "w-[80px]" : "w-[120px]"
        } c-gb:w-[10rem] c-10xl:w-[15rem]  relative transition-all duration-300 bg-white hover:opacity-40 `}
      >
        <input type="" className="hidden " onClick={Open} />
        <div className=" flex justify-center items-center bg-purple  rounded-3xl ">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              onLoad={handleImageLoad}
              className={` bg-cover rounded-[20px]`}
              src={image}
              width={500}
              height={50}
              alt="Picture not found"
            />
          )}
        </div>
      </label>
      <div className="flex flex-col items-center  py-4 ">
        <span>{data.profile?.username}</span>
        <span>{data.profile?.email}</span>
      </div>
    </div>
  );
};

export default ImageProfile;
