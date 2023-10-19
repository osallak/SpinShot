import React, { useEffect, useState } from "react";
import test1 from "../../../public/test1.svg";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Option,
} from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";
import { useRouter } from "next/router";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import { parseJwt } from "../../../redux_tool/extractToken";

const Matchmaking = (props: any) => {
  const data = useAppSelector((state) => state.Profile);
  const [clear, setClear] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();


  
  const handleClick = () => {
    setClear(true);
    props.socket.emit("leaveQueue", console.log("leave queue"));
    props.socket.on("exception", console.log("exception: ", props.socket.id));
    props.socket.on("disconnect", console.log("disconnect: ", props.socket.id));
    props.setIsClick(!props.isClick);
    props.setDataGame(null);
  };


  const getDataOfUaer = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
    try {
      await dispatch(getProfile(parseJwt(JSON.stringify(token)).sub)).unwrap();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const clearkhera = () => {
    setClear(false);
  }

  useEffect(() => {
    getDataOfUaer();
    return () => {
      if (clear) {
        clearkhera();
      }
    };
  }, [data]);

  return (
    <div className="">
      <Dialog
        open={props.isClick}
        handler={() => {}}
        size="sm"
        className="bg-pearl"
      >
        <DialogHeader className=" flex justify-center items-center text-very-dark-purple font-Passion-One text-3xl">
          Match Making
        </DialogHeader>
        <DialogBody className=" flex justify-around items-center flex-row text-lg font-Poppins ">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-cover rounded-2xl  ">
              <picture>
                <img
                  className="rounded-full bg-cover "
                  width={150}
                  height={150}
                  src={data.profile?.profile?.avatar}
                  alt=""
                />
              </picture>
            </div>
            <h1 className="text-very-dark-purple font-Passion-One text-xl">
              {data.profile?.username}
            </h1>
          </div>
          <div className="text-3xl text-very-dark-purple font-Passion-One">
            vs
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-cover rounded-2xl ">
              <picture>
                <img
                  className="rounded-full bg-cover"
                  width={150}
                  height={150}
                  src={props.dataGame?.profile?.avatar}
                  alt=""
                />
              </picture>
            </div>
            <h1 className="text-very-dark-purple font-Passion-One text-xl">
              {props.dataGame?.username}
            </h1>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-3">
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={() => handleClick()}
          >
            <span className="text-very-dark-purple font-Passion-One text-lg">
              Cancel
            </span>
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Matchmaking;
