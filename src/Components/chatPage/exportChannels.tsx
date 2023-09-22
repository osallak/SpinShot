import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import exportChannelsIcon from "../../../public/ExportChannels.svg"

const ExportChannels = (props: {open: boolean, setOpen: any}) => {
    const content = [
        {
            name: "spinshot Game",
        },
        {
            name: "spinshot Game",
        },
        {
            name: "spinshot Game",
        },
        {
            name: "spinshot Game",
        },
        {
            name: "spinshot Game",
        },
        {
            name: "l3asker",
        },
        {
            name: "english learning",
        },
        {
            name: "foot Channel",
        },
        {
            name: "chat game",
        },
        {
            name: "Game",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
        {
            name: "spinshot",
        },
    ]
  return (
    <Dialog open={props.open} handler={props.setOpen} className="border border-green-500 h-[80%]">
        <DialogHeader className="flex items-center space-y-3 justify-center flex-col">
            <Image src={exportChannelsIcon} alt="export channels icon" className="w-20" />
            <h1 className="font-Poppins font-bold text-very-dark-purple">Explore channels</h1>
        </DialogHeader>
        <DialogBody className="border border-red-500 overflow-auto h-[900px] flex justify-center space-y-7 flex-wrap">
            {content.map((c, index)=> (
                <div key={index} className="bg-very-dark-purple w-[350px] h-24 rounded-2xl">{c.name}</div>
            ))}
        </DialogBody>
      </Dialog>
  )
}

export default ExportChannels