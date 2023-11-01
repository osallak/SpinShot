import React from "react";
import { useAppSelector } from "../../../../redux_tool";
import { textLimit } from "./textLimit";
import { getDate } from "./date";

const Matchs = (props: { option: any }) => {
  const data_user = useAppSelector((state) => state.Profile);
  
  return (
    <div className="w-full h-full flex flex-row justify-between items-center px-5 c-gb:px-0 ">
      <div>
        <picture>
          <img
            className=" w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] c-3xl:w-[80px] c-3xl:h-[80px] rounded-2xl"
            src={props?.option?.content?.opponent?.avatar}
            alt=""
          />
        </picture>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-row ">
          <h1 className="">
            {textLimit(props?.option?.content?.opponent?.username, 8)}
          </h1>
          <h1 className="">({props?.option?.content?.opponent?.logs?.rank})</h1>
        </div>
        <div className="flex flex-row ">
          <h1 className="">{textLimit(data_user?.profile?.username, 8)}</h1>
          <h1 className="">({data_user?.profile?.profile?.rank})</h1>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-row">
          <h1 className="">{props?.option?.content?.history?.opponentScore}</h1>
        </div>
        <div className="flex flex-row">
          <h1 className="">{props?.option?.content?.history?.userScore}</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h1 className="">{getDate(props?.option?.content?.startedAt)}</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          {props.option.content?.history?.userScore >
          props.option.content?.history?.opponentScore ? (
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
