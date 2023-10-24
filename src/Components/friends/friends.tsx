"use client";
import parseJwt from "@/utils/parsJwt";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../ui/FolderNavbar/navBar";
import MobileSideBar from "../ui/folderSidebar/mobileSideBar";
import SideBar from "../ui/folderSidebar/sideBar";
import CurrentFriends from "./currentFriends";
import FriendsRequest from "./friendRequest";
import MobileFriends from "./mobileFriends";

const FriendsPage = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      !token ||
      (parseJwt(token).isTwoFactorEnabled &&
        !parseJwt(token).isTwoFaAuthenticated)
    ) {
      router.push("/signin");
      return;
    }
  });

  return (
    <div className="bg-very-dark-purple w-screen h-screen top-0 left-0 flex justify-start md:space-x-3 space-x-0  md:py-3 md:pr-3 md:pl-3 pl-0 py-0 pr-0 items-center flex-row">
      <SideBar flag="friends" />
      {openSideBar && <MobileSideBar flag="friends" />}
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
