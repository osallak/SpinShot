import admin from "../../public/adminIcon.svg";
import ban from "../../public/banIcon.svg";
import game from "../../public/game.svg";
import kick from "../../public/kickIcon.svg";
import mute from "../../public/muteIcon.svg";

const handleClick = () => {
  console.log("hello world from handle click");
};

export const dropDownContent = [
  { content: "Let't Play", click: handleClick, icon: game },
];

const kickUser = () => {};

const banUser = () => {
  console.log("user baned");
};

const muteUser = () => {
  console.log("user muted");
};

const addAdmin = () => {
  console.log("user added as admin");
};

export const roomContent = [
  { content: "Kick", click: kickUser, icon: kick },
  { content: "Ban", click: banUser, icon: ban },
  { content: "Mute", click: muteUser, icon: mute },
  { content: "Add as admin", click: addAdmin, icon: admin },
];
