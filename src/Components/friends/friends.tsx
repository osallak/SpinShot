import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import test1 from "../../../public/test1.svg";
import NavBar from "../ui/navBar/navBar";
import MobileSideBar from "../ui/sideBar/mobileSideBar";
import SideBar from "../ui/sideBar/sideBar";
import CurrentFriends from "./currentFriends";
import FriendsRequest from "./friendRequest";
import MobileFriends from "./mobileFriends";

//this is the last version of friends

const FriendsPage = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin");
      return;
    }
  });

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 flex justify-start md:space-x-3 space-x-0  md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row">
      <SideBar avatar={test1} />
      {openSideBar && <MobileSideBar />}
      <CurrentFriends />
      <FriendsRequest />
      <div className="w-full h-full md:hidden flex flex-col">
        <NavBar open={openSideBar} setOpen={setOpenSideBar} />
        <MobileFriends />
      </div>
    </div>
  );
};

export default FriendsPage;
