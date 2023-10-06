import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page]);

  console.log(page);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${page}`
      );
      setPosts(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(posts);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="space-x-10 text-sm sm:text-2xl flex flex-row w-full ">
      <label className=" flex flex-row items-center rounded-xl p-1 space-x-2 bg-very-dark-purple hover:bg-peridot">
          <svg
            className="w-3.5 h-3.5 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        <button onClick={prevPage}>
          Previous
        </button>
      </label>
      <label className=" flex flex-row items-center rounded-xl p-1 bg-very-dark-purple hover:bg-peridot">
        <button onClick={nextPage}>
          Next
        </button>
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
      </label>
    </div>
  );
};

export default Pagination;
