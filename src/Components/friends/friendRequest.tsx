import Image from "next/image";

const FriendsRequest = () => {

  const array = [
    {
      name: "TeeJee",
    },
    {
      name: "SKNAHS",
    },
    {
      name: "FRAG33R",
    },
    {
      name: "/API",
    },
    {
      name: "l3zawa",
    },
    {
      name: "Navoos",
    },
    {
      name: "PonPon",
    },
  ]

  return (
    <div className="w-[50%] h-full rounded-2xl bg-white/10">
      <div className="flex justify-center items-center flex-col w-full h-[130px]">
        <div className="w-full h-[130px] flex-col px-14">
          <div className="w-full  pt-5 flex flex-row space-x-3 h-[130px]"></div>
          <div className="w-full border border-pearl border-opacity-40"></div>
        </div>
      </div>
      <div className="w-full h-[130px] flex-col px-24">
        <div className="w-full pt-5 flex flex-row space-x-3 h-[130px]">
          <h1 className="flex  justify-center items-center font-Poppins text-pearl xl:text-4xl text-3xl font-bold h-full">
            7 Friend Requests
          </h1>
        </div>
      </div>
      <div className="border max-h-[1000px] w-full overflow-auto">
      
      </div>
    </div>
  );
};

export default FriendsRequest;
