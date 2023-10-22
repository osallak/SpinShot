import parseJwt from "@/utils/parsJwt";
import Image from "next/image";
import { useEffect } from "react";
import threeLines from "../../../../public/threeLines.svg";
import { useAppDispatch, useAppSelector } from "../../../../redux_tool";
import { getProfile } from "../../../../redux_tool/redusProfile/profileThunk";
import { useRouter } from "next/router";

const NavBar = (props: {
  open: boolean;
  setOpen: Function;
  setOpenSubSideBar: Function;
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.Profile);
  const Router = useRouter();

  const openSideBar = () => {
    props.setOpen(!props.open);
    props.setOpenSubSideBar(false);
  };

  const dis = async () => {
    const token = localStorage.getItem("token");
    if (!token || (parseJwt(token).isTwoFactorEnabled && !parseJwt(token).isTwoFaAuthenticated)) {
      Router.push("/signin");
      return;
    }
    const sub = parseJwt(JSON.stringify(token)).sub;
    try {
      await dispatch(getProfile(sub));
    } catch (error: any) {}
  };

  useEffect(() => {
    dis();
  }, []);

  return (
    <div className="w-full h-[9%] md:hidden flex justify-center items-center px-2 pt-2 pb-1 z-50">
      <div className="w-full h-full flex justify-between p-3 items-center bg-white/10 rounded-xl z-50">
        <button
          onClick={openSideBar}
          className="flex justify-center items-center w-10 z-50"
        >
          <Image src={threeLines} alt="three lines" />
        </button>
        <div className="h-full flex justify-center items-center space-x-1">
          <div className="flex justify-center items-end flex-col space-y-0">
            <span className="font-poppins font-semibold text-pearl text-xs">
              {data?.profile?.username}
            </span>
            <span className="font-poppins font-light text-pearl text-opacity-40 text-xs">
              {data?.profile?.email}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={data?.profile?.profile?.avatar}
              width={500}
              height={500}
              alt="test1"
              className="sm:w-10 w-9 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
