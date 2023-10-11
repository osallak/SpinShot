
import { useState, useEffect } from "react";
import axios from "axios";
import nextIcon from "../../../../public/nextIcon.svg";
import previousIcon from "../../../../public/previousIcon.svg";
import Image from "next/image";
import parseJwt from "@/utils/parsJwt";

const Pagination = (props:any) => {

  console.log( "ls ",props.totalPages);
  console.log( "ls ",props.page);
  const nextPage = () => {
    {
      props.page < props.totalPages 
      ? props.setPage(props.page + 1)
      : props.setPage(props.page)
    }
  };

  const prevPage = () => {
    {
      props.page > 1
        ? props.setPage(props.page - 1)
        : props.setPage(props.page);
    }
  };

  return (
    <div className="space-x-10 text-sm sm:text-xl flex bg-very-dark-purple flex-row justify-center items-center w-full rounded-full  ">
      <label className="    ">
        <button
          className="flex flex-row items-center rounded-xl p-2 space-x-2  w-full"
          onClick={prevPage}
        >
          <Image
            className="bg-white rounded-full hover:bg-peridot hover:text-peridot"
            src={previousIcon}
            alt={""}
          />
          <h1>Previous</h1>
        </button>
      </label>
      <label className=" ">
        <button
          className=" flex flex-row items-center space-x-2 justify-end rounded-xl p-2   w-full"
          onClick={nextPage}
        >
          <h1>Next</h1>
          <Image
            className="bg-white rounded-full hover:bg-peridot hover:text-peridot"
            src={nextIcon}
            alt={""}
          />
        </button>
      </label>
    </div>
  );
};

export default Pagination;
