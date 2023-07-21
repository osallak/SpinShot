import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
   
  export default function Example() {
    const data = [
      {
        label: "Public",
        value: "Public",
      },
      {
        label: "Private",
        value: "Private",
      },
    ];
   
  return (
   
  <Tabs value="Public">
    <TabsHeader className="rounded-full bg-black">
      {data.map(({ label, value }) => (
        <Tab key={value} value={value} activeClassName=" text-red-900 bg-peridot" className="w-40 rounded-full" >
          {label}
        </Tab>
      ))}
    </TabsHeader>
  </Tabs>
  );
}