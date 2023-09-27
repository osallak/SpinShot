import { useState } from "react";
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
    <div className="w-full max-w-md px-2 py-16 sm:px-0 border border-red-500">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-full bg-very-dark-purple p-1 border border-green-500">
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
                  <div className="border border-red-500 w-full h-10">
                    {post.flag === "Private" && 
                      <div className="w-full h-full">
                        <input type="text" className="w-full h-full bg-very-dark-purple" placeholder="Name of channel" />
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
