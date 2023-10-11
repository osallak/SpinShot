import React from "react";
import { useAppSelector } from "../../../redux_tool";

const Matchs = (props: { option: any }) => {
  const data_user = useAppSelector((state) => state.Profile);
  return (
    <div className="w-full h-full flex flex-row justify-around items-center  ">
      <div>
        <picture>
          <img
            className=" w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] c-3xl:w-[80px] c-3xl:h-[80px] rounded-2xl"
            src={props.option.content?.opponent.avatar}
            alt=""
          />
        </picture>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-row ">
          <h1 className="">
            {props.option.content?.opponent?.username.length > 8
              ? props.option.content?.opponent?.username.slice(0, 8) + "..."
              : props.option.content?.opponent?.username}
          </h1>
          <h1 className="">({props.option.content?.opponent?.logs?.rank})</h1>
          <h1 className="w-[20%]">
            {props.option.content?.opponent?.country?.length > 8
              ? props.option.content?.opponent?.country.slice(0, 8) + "..."
              : props.option.content?.opponent?.country}
          </h1>
        </div>
        <div className="flex flex-row ">
          <h1 className="">{data_user?.profile?.username}</h1>
          <h1 className="">({data_user?.profile?.profile.rank})</h1>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-row">
          <h1 className="">{props.option.content?.History?.opponentScore}</h1>
        </div>
        <div className="flex flex-row">
          <h1 className="">{props.option.content?.History?.userScore}</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h1 className="">Time</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          {props.option.content?.History?.userScore >
          props.option.content?.History?.opponentScore ? (
            <h1 className="text-peridot">VECTORY</h1>
          ) : (
            <h1 className="text-red-900">DEFEAT</h1>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Matchs;
