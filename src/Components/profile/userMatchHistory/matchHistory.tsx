"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../ui/FolderPagination/pagination";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import ip from "@/utils/endPoint";
import Matchs from "./matchs";
import { clear } from "console";

const MatchHistory = () => {

  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [country, setCountry] = useState(1);
  const [navoos, setNavoos] = useState<any>(null);

  const array = [
    { id: 0, content: posts[0] },
    { id: 1, content: posts[1] },
    { id: 2, content: posts[2] },
    { id: 3, content: posts[3] },
    { id: 4, content: posts[4] },
  ];


  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const my_token = parseJwt(token);
        const id = my_token.sub;
        console.log("id", id);
        const response = await axios.get(
          `${ip}/users/games/${id}?page=${page}&limit=${5}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          );
          console.log("page\n");
          console.log("response.data.data", response.data);
          setNavoos(response.data);
          setPosts(response.data.data);
          setTotalPages(response.data.pagination.pageCount);
        }
      } catch (error) {
        console.error(error);
      }
    };


    useEffect(() => {
      fetchData();
    },[page]);

    // const totalMatch = navoos.totalCount;

  return navoos && (
    <div className="  h-[1100px] c-gb:h-[900px] relative space-y-5 text-[10px] sm:text-sm md:text-lg c-3xl:text-2xl text-pearl">
      <div className=" l text-[15px] sm:text-2xl h-[8%] c-gb:h-[18%]  flex items-end c-10xl:px-24 px-16 ">
        <h1>Match History</h1>
      </div>
      <div className="h-[70%] flex flex-col c-gb:flex-row  ">
        <div className="h-full flex items-center justify-center w-full c-gb:w-[40%]">
          <div className="  w-[70%] h-[80%] sm:w-[40%]  c-gb:h-[50%] c-gb:w-[90%] rounded-[20px] bg-very-dark-purple flex flex-col items-center ">
            <div className="flex justify-center items-center flex-col h-[50%]">
              <h1>Games</h1>
              <h1 className="opacity-40">{navoos.pagination.totalCount}</h1>
            </div>
            <div className="w-[80%] border"></div>
            <div className="h-[50%] w-full flex items-center ">
              <div className="w-[50%] flex-col flex  justify-center items-center">
                <h1>Wins</h1>
                <h1 className="text-peridot">
                  {navoos.wins ?? 0}
                </h1>
              </div>
              <div className="h-[70%]"></div>
              <div className="w-[50%] flex flex-col items-center">
                <h1>Loses</h1>
                <h1 className="text-red-900">
                  {navoos.loses ?? 0}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full ">
          {
            array.length !== 0 ?
            array.map((option: any) => (
              <div key={option.id} className="w-full h-14 sm:h-28 ">
              { option && option.content && <Matchs option={option} />}
            </div>
          )) :
          <div className=" w-full h-full flex justify-center items-center">
            there is no match History
          </div>
        }
        </div>
      </div>
      <div className=" flex justify-center items-center w-full">
        <div className="">
          <Pagination setPage={setPage} page={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
