"use client";

import { ThemeProvider, Button} from "@material-tailwind/react";
export { ThemeProvider, Button };
import SignupPage from "./Signup";

const Home = () => {
  return (
    <ThemeProvider>
      <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-row justify-center items-center ">
        <SignupPage />
      </div>
    </ThemeProvider>
  );
};

export default Home;
