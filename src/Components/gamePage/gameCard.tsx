import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from "@material-tailwind/react";

const GameCard = (props: any) => {

    const handleClick = () => {
      console.log(props.gameState);
      // props.setLost(false);
      // console.log("here ... ", props.setCardState(false));
    // props.setGameOver(false);
  };

  return (
    <div className="">
      <Dialog
        open={props.cardState}
        handler={() => {}}
        size="sm"
        className="bg-pearl space-y-10"
      >
        <DialogHeader className=" flex justify-center items-center text-very-dark-purple font-Passion-One text-3xl">
          {props.gameState}
        </DialogHeader>
        <DialogBody className=" flex justify-center items-center flex-row font-Poppins  text-6xl">
          game is over
        </DialogBody>
        <DialogFooter className="">
          <button
            className=" bg-peridot rounded-full w-28 h-9"
            onClick={handleClick}
          >
            <span className="text-very-dark-purple font-Passion-One text-lg">
              Cancel
            </span>
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default GameCard;
