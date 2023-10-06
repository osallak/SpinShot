/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'very-dark-purple': '#260323',
        'peridot': '#D8EA10',
        'purple': '#B190B6',
        'pearl': '#FEECFC',
        'light-grey': '#D9D9D9',
        'gradiant-white': '#ffffff15'
      },
      fontFamily: {
        'Passion-One': ['Passion One'],
        'Poppins' : ['Poppins', 'sans-serif']
      },
      screens: {
        'x-pp': '1600px',
        'n-pp': '1350px',
        'd-sc': '1800px',
        'c-md': '650px',
        'b-sm': '200px',
        's-sm': '260px',
        'i-sm': '321px',
        'mc': '172px',
        'pa': '1340px',
        'tx': '500px',
        'fl': '1025px',
        'c-0xl': '300px',
        'c-1xl': '1900px',
        'c-xl': '1105px',
        'c-ml': '1637px',
        'c-gb': '1025px',
        'c-sm': '1120px',
        'c-md': '1317px',
        'c-lg': '1384px',
        'c-xs': '1320px',
        'c-2xl': '1844px',
        'c-3xl': '1640px',
        'c-4xl': '1650px',
        'c-5xl': '1360px',
        'c-6xl': '1690px',
        'c-7xl': '2000px',
        'c-8xl': '1793px',
        'c-9xl': '2100px',
        'c-10xl': '1975px',
        'c-11xl': '1976px',
        'c-12xl': '2230px',
      }
    },
  },
});



// import React from "react";
// import OtpVerification from "../Inputs/OtpVerification";
// import scanne from "../../../../public/scanne.svg";
// import CodeQR from "../../../../public/CodeQR.svg";
// import Image from "next/image";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Typography,
// } from "@material-tailwind/react";
// import FormInput from "../formInput/FormInput";

// const TowFactor = (props: { isActive: boolean; Switch: Function }) => {
//   const handleOpen = () => props.Switch(!open);

//   return (
//     <>
//       <Dialog open={props.isActive} handler={handleOpen} size="xs" className="bg-pearl space-y-10">
//         <DialogHeader className="flex flex-col items-center justify-center">
//           <Image src={scanne} alt=""/>
//           <span className="text-3xl text-very-dark-purple">Authenticate your account</span>
//         </DialogHeader >
//         <DialogBody divider className="h-[40rem] overflow-scroll flex flex-col items-center justify-center space-y-10">
//           <Typography className="font-normal flex flex-col items-center justify-center">
//             <Image src={CodeQR} alt="" />
//             <div className="flex flex-row border space-x-5 px-5">
//               <div className="h-[60px] w-[5%] ">
//                 <OtpVerification />
//               </div>
//               <div className="h-[60px] w-[5%] ">
//                 <OtpVerification />
//               </div>
//               <div className="h-[60px] w-[5%] ">
//                 <OtpVerification />
//               </div>
//               <div className="h-[60px] w-[5%] ">
//                 <OtpVerification />
//               </div>
//               <div className="h-[60px] w-[5%] ">
//                 <OtpVerification />
//               </div>
//               <div className="h-[60px] w-[5%] ">
//                 <OtpVerification />
//               </div>
//             </div>
//           </Typography>
//         </DialogBody>
//         <DialogFooter className="space-x-2 ">
//           <Button className="text-very-dark-purple" variant="outlined" color="red" onClick={handleOpen}>
//             close
//           </Button>
//           <div className="bg-peridot">
//           <Button className="text-very-dark-purple bg-peridot w-full h-full" variant="gradient" onClick={handleOpen}>
//             <span className="bg-peridot w-full h-full">Verify</span>
//           </Button>
//           </div>
//         </DialogFooter>
//       </Dialog>
//     </>
//   );
// };

// export default TowFactor;
