import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const Counter = (props: any) => {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    let timer: any;
    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else {
      // clearInterval(timer);
      props.setStart(false);
      setCounter(3);
    }
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return (
    <div className="">
      <Dialog
        open={props.start}
        handler={() => {}}
        size="sm"
        className="bg-pearl space-y-10"
      >
        <DialogHeader className=" flex justify-center items-center text-very-dark-purple font-Passion-One text-3xl">
          Counter
        </DialogHeader>
        <DialogBody className=" flex justify-center items-center flex-row font-Poppins  text-6xl">
          {counter}
        </DialogBody>
        <DialogFooter className="">.</DialogFooter>
      </Dialog>
    </div>
  );
};

export default Counter;
