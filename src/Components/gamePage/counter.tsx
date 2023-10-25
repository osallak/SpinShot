import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader
  } from "@material-tailwind/react";
  
  const Counter = (props: any) => {
  
  
    return (
      <div className="">
        <Dialog
          open={props.start}
          handler={() => {}}
          size="sm"
          className="bg-pearl space-y-10"
        >
          <DialogHeader className=" flex justify-center items-center text-very-dark-purple font-Passion-One text-3xl">
            {props.gameState}
          </DialogHeader>
          <DialogBody className=" flex justify-center items-center flex-row font-Poppins  text-6xl">
            {props.counter}
          </DialogBody>
          <DialogFooter className="">
          </DialogFooter>
        </Dialog>
      </div>
    );
  };
  
  export default Counter;
  