
import Image from 'next/image';
import { useState } from 'react';
import lock from "../../../../public/lock.svg"
// import { Tabs, TabsHeader, Tab, TabsBody, TabPanel } from "@material-tailwind/react";
import { Tab } from '@headlessui/react'

const SwitchButton = () => {
  const [activeTab, setActiveTab] = useState("public");
  let [categories] = useState({
    Public: [
      {
        flag: 'Public',
      },
    ],
    Private: [
      {
        flag: 'Private',
      },
    ],
    Protected: [
      {
        flag: 'Protected',
      },
    ],
  })

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-full bg-very-dark-purple p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-full py-1 text-xl font-medium font-Passion-One leading-5 text-pearl',
                  'ring-none focus:outline-none focus:ring-none',
                  selected
                    ? 'bg-peridot text-very-dark-purple'
                    : ''
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-transparent p-3',
                'ring-none focus:outline-none focus:ring-none'
              )}
            >
                {posts.map((post) => (
                  <div className="w-full h-10">
                    {post.flag === "Private" && 
                      <div className="w-full h-full">
                        <input type="text" className="w-full h-full bg-very-dark-purple rounded-full p-5 placeholder:text-pearl placeholder:text-opacity-40 font-Poppins" placeholder="Name of channel" />
                      </div>
                    }
                    {post.flag === "Public" && 
                      <div className="w-full h-full">
                        <input type="text" className="w-full h-full bg-very-dark-purple rounded-full p-5 placeholder:text-pearl placeholder:text-opacity-40 font-Poppins" placeholder="Name of channel" />
                      </div>
                    }
                    {post.flag === "Protected" && 
                      <div className="w-full h-full space-y-2">
                        <input type="text" className="w-full h-full bg-very-dark-purple rounded-full p-5 placeholder:text-pearl placeholder:text-opacity-40 font-Poppins" placeholder="Name of channel" />
                        <div className="w-full h-full bg-very-dark-purple rounded-full flex px-3">
                        <Image src={lock} alt="lock icon" className='w-7' />
                        <input type="text" className="w-full h-full bg-very-dark-purple rounded-full pl-2 placeholder:text-pearl placeholder:text-opacity-40 font-Poppins" placeholder="Password of channel" />
                        </div>
                      </div>
                    }
                  </div>
                ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SwitchButton;
