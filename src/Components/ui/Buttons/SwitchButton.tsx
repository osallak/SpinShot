
import Image from 'next/image';
import { useEffect, useState, useRef, FocusEvent, ChangeEvent } from 'react';
import lock from "../../../../public/lock.svg"
// import { Tabs, TabsHeader, Tab, TabsBody, TabPanel } from "@material-tailwind/react";
import { Tab } from '@headlessui/react'

const SwitchButton = (props: {setType: Function, setName: Function, setPassword: Function}) => {
  let [categories] = useState({
    Public: [
      {
        type: 'Public',
      },
    ],
    Private: [
      {
        type: 'Private',
      },
    ],
    Protected: [
      {
        type: 'Protected',
      },
    ],
  })
  const [state, setState] = useState("Public");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleBlur = (category: string) => {
    setState(category);
    setName("");
    setPassword("");
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  const getName = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  }

  const getPassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  useEffect(() => {
    props.setType(state.toUpperCase());
    props.setName(name);
    props.setPassword(password);
  }, [state, name, password])

  return (
    <div className="w-full max-w-md space-y-3">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-full bg-very-dark-purple p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              onClick={() => handleBlur(category)}
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
        <Tab.Panels className={classNames('space-y-2')}>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-transparent',
                'ring-none focus:outline-none focus:ring-none'
              )}
            >
                {posts.map((items, index) => (
                  <div key={index} className="w-full h-24">
                    {items.type === "Private" && 
                      <div className="w-full h-full">
                        <input onChange={(event) => getName(event)} type="text" className="w-full h-10 bg-very-dark-purple rounded-full p-5 placeholder:text-pearl placeholder:text-opacity-40 font-Poppins outline-none ring-0 focus:outline-none text-pearl" placeholder="Name of channel" />
                      </div>
                    }
                    {items.type === "Public" && 
                      <div className="w-full h-full">
                        <input onChange={(event) => getName(event)} type="text" className="w-full h-10 bg-very-dark-purple rounded-full p-5 placeholder:text-pearl placeholder:text-opacity-40 font-Poppins outline-none ring-0 focus:outline-none text-pearl" placeholder="Name of channel" />
                      </div>
                    }
                    {items.type === "Protected" && 
                      <div className="w-full h-10 space-y-2">
                        <input onChange={(event) => getName(event)} type="text" className="w-full h-10 bg-very-dark-purple rounded-full p-5 placeholder:text-pearl placeholder:text-opacity-40 font-Poppins outline-none ring-0 focus:outline-none text-pearl " placeholder="Name of channel" />
                        <div className="w-full h-10 bg-very-dark-purple rounded-full flex px-3">
                          <input onChange={(event) => getPassword(event)} type="text" className="w-full h-full bg-very-dark-purple rounded-l-full pl-2 placeholder:text-pearl placeholder:text-opacity-40 font-Poppins outline-none ring-0 focus:outline-none text-pearl" placeholder="Password of channel" />
                          <Image src={lock} alt="lock icon" className='w-7' />
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
