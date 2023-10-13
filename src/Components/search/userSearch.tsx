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

import Image from "next/image";
import axios from "axios";
import ip from "@/endpoint/api";
import { textLimit } from "../profile/userMatchHistory/textLimit";

const Search = (props: { setSearch: Function; isSearch: boolean }) => {
  const [user, setUser] = useState("");
  const [resulta, setSearchResults] = useState<any>([]);
  // const [isOpen, setOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<any>();

  const getUsers = (event: any) => {
    setUser(event.target.value);
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.get(`${ip}/users?keyword=${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResults(response.data);
      console.log("here ", response.data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleChange = (e: any) => {
    setUser(e.target.value);
    handleSearch();
  };

  const handelClear = () => {
    setUser("");
    setSearchResults([]);
    props.setSearch(!props.isSearch);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  });

  return (
    <div className="">
      <Dialog
        open={props.isSearch}
        handler={
          props.isSearch ? handelClear : props.setSearch(!props.isSearch)
        }
        size="xs"
        className="bg-pearl"
      >
        <DialogHeader className="flex justify-center items-center">
          <h1>Search</h1>
        </DialogHeader>
        <DialogBody className="flex justify-center items-center w-full h-[500px] flex-col space-y-10 text-pearl ">
          <div className=" w-[80%] ">
            <input
              type="text"
              className="w-full h-14 rounded-full bg-very-dark-purple px-7 text-md text-pearl font-Poppins overflow-scroll"
              placeholder="Search..."
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div className="flex flex-col  w-[80%] bg-very-dark-purple rounded-3xl  font-Poppins font-semibold text-sm ">
            {resulta?.data?.length > 0 && user !== "" ? (
              resulta?.data.map((index: any) => (
                <div
                  key={index.username}
                  className="flex flex-row justify-between items-center px-4 text-xs"
                >
                  <div className="flex flex-row justify-center items-center ">
                    <picture>
                      <img
                        className=" w-10 h-10 sm:w-14 sm:h-14 p-2 rounded-xl"
                        src={index?.avatar}
                        alt="image not found"
                      />
                    </picture>
                  </div>
                  {width < 640 ? (
                    <h1 className="text-white">{textLimit(index?.username, 3)}</h1>
                  ) : null}
                  <button className="border  sm:p-2 rounded-full bg-peridot text-very-dark-purple ">
                    profile
                  </button>
                </div>
              ))
            ) : (
              <div className="felx justify-center items-center w-full ">
                <p></p>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-3">
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={handelClear}
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
