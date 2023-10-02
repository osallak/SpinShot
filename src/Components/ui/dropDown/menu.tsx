import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import threePoint from "../../../../public/threePoint.svg";
import { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import active from "../../../../public/active.svg"

type Content = {
  content: string;
  click: MouseEventHandler<HTMLButtonElement>;
  icon: string;
};

type Array = {
  data: Content[];
};

const NotificationsMenu: React.FC<Array> = ({data}) => {
  return (
    <Menu>
      <MenuHandler>
        <IconButton
          className="outline-none hover:outline-none ring-0 hover:bg-transparent"
          variant="text"
        >
          <Image src={threePoint} alt="threePoine" />
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col jsutify-center items-center border-none rounded-2xl bg-very-dark-purple">
        {data.map((items, index) => (
          <div key={index} className="flex flex-col items-center justify-center w-full h-full bg-very-dark-purple py-2 hover:bg-very-dark-purple hover:outline-none outline-none ring-0">
            <Typography
              variant="small"
              className="font-normal flex justify-start w-[80%] items-center"
            >
              <motion.button whileTap={{scale: 0.9}} onClick={items.click} className="font-semibold font-Passion-One text-pearl opacity-40 hover:opacity-100 flex space-x-2">
                <Image src={items.icon} alt="accept user" className="w-5" />
                <span>{items.content}</span>
              </motion.button>
            </Typography>
          </div>
        ))}
      </MenuList>
    </Menu>
  );
}

export default NotificationsMenu
