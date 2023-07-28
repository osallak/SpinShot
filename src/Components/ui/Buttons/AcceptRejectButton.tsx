import Image from "next/image";
import { OthersProps } from "@/types/ButtonProps";

const AcceptRejectButton: React.FC<OthersProps> = ({ onclick, content }) => {
  return (
    <button
      onClick={onclick}
      className="md:h-9 md:w-9 h-5 w-5 rounded-full flex justify-center items-center"
    >
      <Image className="w-full h-full" src={content} alt="accepte button" />
    </button>
  );
};

export default AcceptRejectButton;
