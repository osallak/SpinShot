"use client";

import { ThemeProvider, Button} from "@material-tailwind/react";
export { ThemeProvider, Button };
import { useRef, useEffect, useState } from "react";
import SignupPage from "./Signup";
import SigninPage from "./Signin";

const Home = () => {
  const [widthsc, setwidthsc] = useState<number | undefined>(undefined)
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Add event listener to update window width on resize
      const handleResize = () => {
        setwidthsc(window.innerWidth);
      };

      // Set initial window width
      setwidthsc(window.innerWidth);

      // Add event listener to window resize
      window.addEventListener('resize', handleResize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  return (
    <ThemeProvider>
      <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-row justify-center items-center ">
        {/* <SigninPage /> */}
      </div>
    </ThemeProvider>
  );
};

export default Home;
