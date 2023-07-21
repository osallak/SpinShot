import React from "react";


import {
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
 
export default function ToggleButton() {
  const [activeTab, setActiveTab] = React.useState("public");
  const data = [
    {
      label: "Public",
      value: "public",
    },
    {
      label: "Private",
      value: "private",
    },
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="bg-very-dark-purple rounded-full md:w-48 md:h-10 h-7 w-40"
        indicatorProps={{
          className: "bg-peridot rounded-full",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-very-dark-purple text-sm md:text-xl font-Passion-One" : "text-pearl text-sm md:text-xl font-Passion-One"}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}