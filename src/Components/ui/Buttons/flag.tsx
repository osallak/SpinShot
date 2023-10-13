// import Country from "./Country";
// import country from "country-list";
// import React from "react";

// const Flag = (props:any) => {
//   const countries = country.getData().sort((a: any, b: any) => {
//     return a.name < b.name ? -1 : 1;
//   });

//   function getFlagEmoji(countryCode: any) {
//     const codePoints = countryCode
//       .toUpperCase()
//       .split("")
//       .map((char: any) => 127397 + char.charCodeAt());
//     props.setCountry(String.fromCodePoint(...codePoints));
//   }

//   return (
//     <div>
//       {countries.map((countent: any, index: any) => (
//         <div className="" key={index}>
//           {countent.name === props.country ? getFlagEmoji(countent.code) : null}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Flag;
