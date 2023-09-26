import { useState } from "react";
import { Tabs, TabsHeader, Tab, TabsBody, TabPanel } from "@material-tailwind/react";

const SwitchButton = () => {
  const [activeTab, setActiveTab] = useState("public");
  const data = [
    {
      label: "Public",
      value: "public",
    },
    {
      label: "Private",
      value: "private",
    },
    {
      label: "Protected",
      value: "Protected",
    },
  ];

  return (
    <Tabs value="html">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default SwitchButton;
