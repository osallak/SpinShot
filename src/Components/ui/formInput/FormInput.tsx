import React from "react";

const FormInput = (props: { handleChange(e: React.ChangeEvent<HTMLInputElement>): void, name: string, placehold: string }) => {
  return (
    <div className="  ">
        <input
          name={props.name}
          onChange={props.handleChange}
          className=" bg-very-dark-purple w-full rounded-[20px] px-5 h-14 placeholder:text-pearl placeholder:text-opacity-40 outline-none"
          type=""
          required
          placeholder={props.placehold}
        />
      </div>
  );
};

export default FormInput;
