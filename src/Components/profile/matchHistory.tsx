import React, { useEffect, useState } from "react";
import imagePlayer from "../../../public/imagePlayer.svg";
import Image from "next/image";
import Pagination from "../ui/pagination/pagination";
import parseJwt from "@/utils/parsJwt";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { useAppDispatch, useAppSelector } from "../../../redux_tool";

const MatchHistory = () => {
  interface objType {
    body: string;
    id: number;
    title: string;
    userId: number;
  }

  const data_user = useAppSelector((state) => state.Profile);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState(1);

  console.log("total ", totalPages);
  console.log("1post", posts[0]);

  const array = [
    { id: 0, content: posts[0] },
    { id: 1, content: posts[1] },
    { id: 2, content: posts[2] },
    { id: 3, content: posts[3] },
    { id: 4, content: posts[4] },
  ];

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const my_token = parseJwt(token);
        const id = my_token.sub;
        const response = await axios.get(
          `http://e3r10p13.1337.ma:3000/users/games/${"1b227993-6fb7-4f08-8cf4-899b745bfb26"}?page=${page}&limit=${5}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikplc3N5Y2FfTHluY2giLCJzdWIiOiIxYjIyNzk5My02ZmI3LTRmMDgtOGNmNC04OTliNzQ1YmZiMjYiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5Njg4MTcxNSwiZXhwIjoxNjk2OTY4MTE1fQ.BcphZxRWilg2GouIL5FzDEo4Tkayqx8L_bQfPicaPPQ`,
            },
          }
        );
        setPosts(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalMatch =
    posts[0]?.user?.logs?.victories + posts[0]?.user?.logs?.defeats;

  return (
    <div className="  h-[1100px] c-gb:h-[900px] relative space-y-5 text-[10px] sm:text-sm md:text-lg c-3xl:text-2xl text-pearl">
      <div className=" l text-[15px] sm:text-2xl h-[8%] c-gb:h-[18%]  flex items-end c-10xl:px-24 px-16 ">
        <h1>Match History</h1>
      </div>
      <div className="h-[70%] flex flex-col c-gb:flex-row  ">
        <div className="h-full flex items-center justify-center w-full c-gb:w-[40%]">
          <div className="  w-[70%] h-[80%] sm:w-[40%]  c-gb:h-[50%] c-gb:w-[90%] rounded-[20px] bg-very-dark-purple flex flex-col items-center ">
            <div className="flex justify-center items-center flex-col h-[50%]">
              <h1>Games</h1>
              <h1 className="opacity-40">{totalMatch}</h1>
            </div>
            <div className="w-[80%] border"></div>
            <div className="h-[50%] w-full flex items-center ">
              <div className="w-[50%] flex-col flex  justify-center items-center">
                <h1>Wins</h1>
                <h1 className="text-peridot">
                  {posts[0]?.user?.logs?.victories}
                </h1>
              </div>
              <div className="h-[70%]"></div>
              <div className="w-[50%] flex flex-col items-center">
                <h1>Loses</h1>
                <h1 className="text-red-900">
                  {posts[0]?.user?.logs?.defeats}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full ">
          {array.map((option: any) => (
            <div key={option.id} className="w-full h-14 sm:h-28 ">
              {option.content && (
                <div className="w-full h-full flex flex-row justify-around items-center  ">
                  <div>
                    <picture>
                      <img
                        className=" w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] c-3xl:w-[80px] c-3xl:h-[80px] rounded-2xl"
                        src={option.content?.opponent.avatar}
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex flex-row ">
                      <h1 className="">
                        {" "}
                        {option.content?.opponent?.username.length > 8
                          ? option.content?.opponent?.username.slice(0, 8) +
                            "..."
                          : option.content?.opponent?.username}
                      </h1>
                      <h1 className="">
                        ({option.content?.opponent?.logs?.rank})
                      </h1>
                      <h1 className="w-[20%]">
                        {option.content?.opponent?.country?.length > 8
                          ? option.content?.opponent?.country.slice(0, 8) +
                            "..."
                          : option.content?.opponent?.country}
                      </h1>
                    </div>
                    <div className="flex flex-row ">
                      <h1 className="">{data_user?.profile?.username}</h1>
                      <h1 className="">({data_user?.profile?.profile.rank})</h1>
                      <h1 className="">
                        {data_user?.profile?.profile.country}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex flex-row">
                      <h1 className="">
                        {option.content?.History?.opponentScore}
                      </h1>
                    </div>
                    <div className="flex flex-row">
                      <h1 className="">{option.content?.History?.userScore}</h1>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <h1 className="">Time</h1>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      {option.content?.History?.userScore >
                      option.content?.History?.opponentScore ? (
                        <h1 className="text-peridot">VECTORY</h1>
                      ) : (
                        <h1 className="text-red-900">DEFEAT</h1>
                      )}
                    </div>
                  </div>
                  <div></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className=" flex justify-center items-center w-full">
        <div className="">
          <Pagination setPage={setPage} page={page} />
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
