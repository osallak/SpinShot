import React, { useState } from "react";
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
import axios from "axios";
import ip from "@/endpoint/api";

const Search = (props: {isSearch: boolean}) => {
  const [user, setUser] = useState("");
  const [resulta, setSearchResults] = useState([]);

  const array = [
    {user:"issam", profile:"profile", image:test1},
    {user:"issam", profile:"profile", image:test1},
    {user:"issam", profile:"profile", image:test1}

  ]

  const getUsers = (event:any) => {
    setUser(event.target.value);
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${ip}/users?search=${user}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e:any) => {
    setUser(e.target.value);
    handleSearch();
  };

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
        <DialogBody  className="flex justify-center items-center w-full h-[500px] flex-col space-y-10 text-pearl ">
          <div className=" w-[80%]">
            <input type="text" className="w-full h-14 rounded-full bg-very-dark-purple px-7 text-md text-pearl font-Poppins" placeholder="Search..." onChange={(event) => handleChange(event)}/>
          </div>
          {1 && (
            <div className="flex flex-col  w-[80%] bg-very-dark-purple rounded-3xl space-y-2 overflow-scroll font-Poppins font-semibold text-sm ">
              {array.map((index:any, data:any) => (
                <div key={index} className="flex flex-row justify-around items-center">
              <div className="flex flex-row justify-center items-center ">
                <Image src={test1} alt="image not found"/>
              </div>
              <h1>ibenmain</h1>
              <button className="border p-2 rounded-full bg-peridot text-very-dark-purple">
                profile
              </button>
                </div>
              ))}

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
