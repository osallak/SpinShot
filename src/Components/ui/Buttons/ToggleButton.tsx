import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import active from "../../../../public/active.svg";
import unactive from "../../../../public/unactive.svg";
import TwoFactor from "../twoFactorauth/TwoFactorAuth";
import axios from "axios";
import ip from "@/utils/endPoint";

const ToggleButton = (props: { isActive: boolean; setisActive: Function }) => {
  const token = localStorage.getItem("token");
  const [twoFaToggleSwitchStatus, setTwoFaToggleSwitchStatus] = useState(false);
  useEffect(() => {
    fetchTwoFAStatus();
  });

  const fetchTwoFAStatus = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/2fa/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) setTwoFaToggleSwitchStatus(res.data);
    } catch {}
  };
  const Switch = () => {
    props.setisActive(!props.isActive);
  };

  return (
    <div className="bg-red md:h-6 md:w-10 h-4 w-7 ">
      <motion.button
        className={`md:h-6 c-3xl:h-8 md:w-10 c-3xl:w-14 h-6 w-9 bg-light-grey bg-opacity-20 rounded-full px-1 flex items-center `}
        style={{ justifyContent: twoFaToggleSwitchStatus ? "flex-end" : "flex-start" }}
        onClick={Switch}
      >
        <motion.div
          className="md:h-4 c-3xl:h-6 md:w-6 h-4 w-4 opacity-100 rounded-full flex justify-center items-center "
          layout
        >
          {twoFaToggleSwitchStatus ? (
            <Image
              className="w-full h-full"
              src={active}
              alt="unactive button"
            />
          ) : (
            <Image
              className="w-full h-full"
              src={unactive}
              alt="active button"
            />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ToggleButton;
