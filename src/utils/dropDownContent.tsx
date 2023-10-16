import game from "../../public/game.svg";
import trash from "../../public/trash.svg";

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