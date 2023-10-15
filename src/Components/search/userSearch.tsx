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

import axios from "axios";
import { textLimit } from "../profile/userMatchHistory/textLimit";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import { useAppDispatch } from "../../../redux_tool";
import { useRouter } from "next/router";
import ip from "@/utils/endPoint";

const Search = (props: { isSearch: boolean }) => {
  const [user, setUser] = useState("");
  const [resulta, setSearchResults] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [width, setWidth] = useState<any>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${ip}/users?keyword=${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    setUser(e.target.value);
    setSearchTerm(e.target.value);
    handleSearch();
  };

  const handelClear = () => {
    setUser("");
    setSearchResults([]);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const getInformation = (item: any) => {
    dispatch(getProfile(item));
    router.push(`/profile/${item}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [width, searchTerm]);

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
                  key={index?.username}
                  className="flex flex-row justify-between items-center px-4 text-xs sm:text-lg"
                >
                  <div className="flex flex-row justify-center items-center ">
                    <picture className="text-xs">
                      <img
                        className=" w-10 h-10 sm:w-14 sm:h-14 p-2 rounded-xl"
                        src={index?.avatar}
                        alt="Oops"
                      />
                    </picture>
                  </div>
                  {width < 450 ? (
                    <h1 className="text-white">
                      {textLimit(index?.username, 3)}
                    </h1>
                  ) : (
                    <h1 className="text-white">{index?.username}</h1>
                  )}
                  <button
                    onClick={() => getInformation(index.id)}
                    className="border  sm:p-2 rounded-full bg-peridot text-very-dark-purple "
                  >
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
