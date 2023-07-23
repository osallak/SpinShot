import Image from "next/image";
import { OthersProps } from "@/types/ButtonProps";

const AcceptRejectButton: React.FC<OthersProps> = ({ onclick, content }) => {
  return (
    <button onClick={onclick} className="md:h-5 md:w-5 h-3 w-3 rounded-full flex justify-center items-center">
        <Image className="w-full h-full" src={content} alt="accepte button"/>
    </button>
  );
};

export default AcceptRejectButton
