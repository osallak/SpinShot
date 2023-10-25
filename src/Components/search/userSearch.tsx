import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { isStringEmptyOrWhitespace } from "@/lib/utils";
import ip from "@/utils/endPoint";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../redux_tool";
import { getProfile } from "../../../redux_tool/redusProfile/profileThunk";
import { textLimit } from "../profile/userMatchHistory/textLimit";

const Search = (props:any) => {
  const [user, setUser] = useState("");
  const [resulta, setSearchResults] = useState<any>([]);
  const [width, setWidth] = useState<any>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSearch = async (targetValue__ : string ) => {
    const token = localStorage.getItem("token");
    try {
      if (isStringEmptyOrWhitespace(targetValue__))
        return;
      if (targetValue__)
      {
        const response = await axios.get(`${ip}/users?keyword=${targetValue__}&limit=${10}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        
        setSearchResults(response.data);
      }
      } catch (error) {
        console.error(error);
      }
  };


  const handleChange = (e: any) => {
    const targetValue = e.target.value;
      setUser(targetValue);
      handleSearch(targetValue);
  };

  const handelClear = () => {
    setUser("");
    setSearchResults([]);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const getInformation = (item: any) => {
    handelClear();
    dispatch(getProfile(item));
    router.push(`/profile/${item}`);
  };

  useEffect(() => {
    if(!props.isSearch)
      handelClear();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [width, props.isSearch]);

  

  return (
    <div className="">
      <Dialog
        open={props.isSearch}
        handler={() => {}}
        size="sm"
        className="bg-pearl"
      >
        <DialogHeader className="flex justify-center items-center">
          <h1>Search</h1>
        </DialogHeader>
        <DialogBody className="flex justify-center items-center w-full h-[500px] flex-col space-y-10 text-pearl ">
          <div className=" w-[80%] ">
            <input
              type="text"
              className="w-full h-14 rounded-full bg-very-dark-purple px-7 text-md text-pearl font-Poppins outline-none ring-0 focus:ring-0"
              placeholder="Search..."
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div className="flex flex-col  w-[80%] bg-very-dark-purple rounded-3xl  font-Poppins font-semibold text-sm  scrollbar-rounded-5 scrollbar scrollbar-track-transparent overflow-scroll h-[500px] ">
            {resulta?.data?.length > 0 && user !== "" ? (
              resulta?.data.map((index: any) => (
                <div
                  key={index?.username}
                  className="flex flex-row justify-between items-center px-4 text-xs sm:text-lg"
                >
                  <div className="flex flex-row justify-center items-center ">
                    <picture className="text-xs">
                      <img
                        className=" w-10 h-10 sm:w-14 sm:h-14 p-2 rounded-2xl"
                        src={index?.avatar}
                        alt="Oops"
                      />
                    </picture>
                  </div>
                  {width < 450 ? (
                    <h1 className="text-white">
                      {textLimit(index?.username, 5)}
                    </h1>
                  ) : (
                    <h1 className="text-white">{textLimit(index?.username, 13)}</h1>
                  )}
                  <button
                    onClick={() => getInformation(index.id)}
                    className=" sm:p-2 h-[60%] flex items-center justify-center rounded-full bg-peridot text-very-dark-purple text-xs sm:text-sm font-Passion-One w-12 sm:w-20"
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
