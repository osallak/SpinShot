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

type Content = {
  content: string;
  click: MouseEventHandler<HTMLButtonElement>;
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
      <MenuList className="flex flex-col jsutify-center items-center border-none bg-very-dark-purple">
        {data.map((items, index) => (
          <div key={index} className="flex flex-col items-center justify-center w-full h-full bg-very-dark-purple py-2 hover:bg-very-dark-purple hover:outline-none outline-none ring-0">
            <Typography
              variant="small"
              className="font-normal flex justify-center items-center"
            >
              <button onClick={items.click} className="font-semibold font-Passion-One text-pearl">
                {items.content}
              </button>
            </Typography>
          </div>
        ))}
      </MenuList>
    </Menu>
  );
}

export default NotificationsMenu
