import game from "../../public/game.svg";
import trash from "../../public/trash.svg";
import ban from "../../public/banIcon.svg";
import kick from "../../public/kickIcon.svg";
import mute from "../../public/muteIcon.svg";
import admin from "../../public/adminIcon.svg";
import { channelAtom } from "@/Components/context/recoilContextChannel";
import { useRecoilState } from "recoil";
import channelType from "@/types/channelTypes";

// const [channel, setChannel] = useRecoilState(channelAtom);

const deleteConversation = () => {
    console.log("hello world from the other side");
  };

  const handleClick = () => {
    console.log("hello world from handle click");
  };


export const dropDownContent = [
  { content: "Delete Conversation", click: deleteConversation, icon: trash },
  { content: "Let't Play", click: handleClick, icon: game },
];

const kickUser = () => {

}

const banUser = () => {
  console.log("user baned");
}

const muteUser = () => {
  console.log("user muted");
}

const addAdmin = () => {
  console.log("user added as admin")
}


export const roomContent = [
  {content: "Kick", click: kickUser, icon: kick},
  {content: "Ban", click: banUser, icon: ban},
  {content: "Mute", click: muteUser, icon: mute},
  {content: "Add as admin", click: addAdmin, icon: admin}
]