import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const ChangePhoto = (props:{ isActive:boolean, Switch:Function}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => props.Switch(!props.isActive);
   
    return (
      <div className="">
        <Dialog className=" h-[60%] bg-pearl" open={props.isActive} size={"sm"} handler={handleOpen}>
          <DialogHeader>
            .
          </DialogHeader>
          <DialogBody divider>
            .
          </DialogBody>
          <div>
            {/* <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button> */}
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }

export default ChangePhoto