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
// import { useAppDispatch, useAppSelector } from "../../../redux_tool";
// import { useRouter } from "next/router";
// import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
// import { parseJwt } from "../../../redux_tool/extractToken";
// import ip from "@/utils/endPoint";
// import axios from "axios";
// import { constants } from "buffer";

const Gamemenu = (props: any) => {
  const handleClick = () => {
    props.setIsClick2(false);
  };

  return (
    <div className="">
      <Dialog
        open={props.isClick2}
        handler={() => {}}
        size="sm"
        className="bg-pearl space-y-10"
      >
        <DialogHeader className=" flex justify-center items-center text-very-dark-purple font-Passion-One text-3xl">
          Welcome
        </DialogHeader>
        <DialogBody className=" flex justify-center items-center flex-row text-lg font-Poppins ">
          choose your map
        </DialogBody>
        <DialogFooter className="">
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={handleClick}
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

export default Gamemenu;
