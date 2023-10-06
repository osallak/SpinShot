import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);

  // Fetch data based on the current page
  useEffect(() => {
    fetchData();
  }, [page]);

  console.log(page);
  // Fetch data from the API
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
  // Go to the next page
  const nextPage = () => {
    setPage(page + 1);
  };

  // Go to the previous page
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className='flex justify-center items-center flex-col text-white'>
        <h1>{posts?.title}</h1>
        <button onClick={nextPage}>
            Next
        </button>
        <button onClick={prevPage}>
        Previous
        </button>
      {/* <h1>Homepage</h1>
      <ul>
        {posts.map((post:any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>

      <Link href="/posts">
        <span>View All Posts</span>
      </Link> */}
    </div>
  );
};

export default Home;