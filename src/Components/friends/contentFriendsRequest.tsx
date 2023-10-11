import test1 from "../../../public/test1.svg";
import Image from "next/image";
import Example from "../ui/DropDown/menu";
import accept from "../../../public/active.svg"
import refuse from "../../../public/unactive.svg"
import DropDown from "../ui/DropDown/Dropdown";

const ContentFriendsRequests = () => {
    const array = [
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "TeeJee",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "SKNAHS",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "FRAG33R",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "/API",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "l3zawa",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "Navoos",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "PonPon",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
        {
          icon: test1,
          email: "tajiayoub35@gmail.com",
          name: "MAR1",
        },
      ];

	const handleClick = () => {
    console.log("hello world from the other side");
  };

	const menu = [
    { content: "Accept", click: handleClick, icon: accept },
    { content: "Refuse", click: handleClick, icon: refuse },
  ];
  return (
    <>
      <div className="w-[85%] h-[10%] min-h-[60px] flex-col">
        <h1 className="flex justify-start items-center font-Poppins text-pearl lg:text-3xl md:text-2xl text-base font-bold h-full">
          7 Friend Requests
        </h1>
      </div>
      <div className="h-[70%] flex flex-col items-center min-h-[150px] w-[95%] overflow-auto rounded-sm">
        {array.map((items, index) => (
          <div key={index} className="w-full h-[60px] min-h-[60px]">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[50%] h-full flex justify-start items-center space-x-2">
                <Image
                  src={items.icon}
                  alt="avatar"
                  className="xl:w-16 md:w-14 w-10"
                />
                <div className="h-[70%] flex justify-center flex-col">
                  <p className="font-Poppins text-pearl font-semibold xl:text-xl md:text-lg text-base">
                    {items.name}
                  </p>
                  <p className="font-Poppins text-pearl text-opacity-40 font-normal xl:text-base md:text-sm text-xs sm:fixed hidden">
                    {items.email}
                  </p>
                </div>
              </div>
              <div className="w-[50%] h-full flex justify-end items-center xl:space-x-3 md:space-x-2 space-x-1 xl:pr-3 pr-1">
                <DropDown data={menu} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentFriendsRequests;
