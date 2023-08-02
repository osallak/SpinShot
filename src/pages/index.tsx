"use client";

import { ThemeProvider, Button} from "@material-tailwind/react";
export { ThemeProvider, Button };
import SignupPage from "./Signup";
import SigninPage from "./Signin";

const Home = () => {
  return (
    <ThemeProvider>
      <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-row justify-center items-center ">
        <SigninPage />
      </div>
    </ThemeProvider>
  );
};

export default Home;
