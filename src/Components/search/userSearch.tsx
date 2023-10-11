import React from "react";
import test1 from "../../../public/test1.svg";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Option,
} from "@material-tailwind/react";
import Image from "next/image";

const Search = (props: {isSearch: boolean}) => {

  const getUsers = (event:any) => {
    
  }

  return (
    <div className="">
      <Dialog
        open={props.isSearch}
        handler={() => {}}
        size="xs"
        className="bg-pearl"
      >
        <DialogHeader className="flex justify-center items-center">
          <h1>Search</h1>
        </DialogHeader>
        <DialogBody  className="flex justify-center items-center w-full flex-col space-y-10">
          <div className=" w-[80%]">
            <input type="text" className="w-full h-14 rounded-full bg-very-dark-purple px-7 text-md text-pearl font-Poppins" placeholder="Search..." onChange={(event) => getUsers(event)}/>
          </div>
          {1 && (
            <div className="flex justify-between items-center  border">
              <div className="">
                <Image src={test1} alt="image not found"/>
              </div>
              <h1>username</h1>
              <button>
                Profile
              </button>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="space-x-3">
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={()=>{}}
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

export default Search;
