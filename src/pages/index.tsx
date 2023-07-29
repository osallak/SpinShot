"use client";

import { ThemeProvider, Button, input } from "@material-tailwind/react";
export { ThemeProvider, Button };
import Signup from "@/Components/authentication/signup/signup";

const Home = () => {
  return (
    <ThemeProvider>
      <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-row justify-center items-center ">
        <Signup />
      </div>
    </ThemeProvider>
  );
};
export default Home;
