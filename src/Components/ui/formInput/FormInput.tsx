import React, { useEffect, useState } from "react";

const FormInput = (props: {
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  name: string;
  placehold: string;
  value: string
}) => {

  const [placeholder, setPlaceholder] = useState("");

  const handleFocus = () => {
    setPlaceholder("");
  }

  const handleBlur = () => {
    setPlaceholder(props.value)
    {props.value ? setPlaceholder(props.value) : setPlaceholder(props.name);}
  }

  
  useEffect(() => {
    {props.value ? setPlaceholder(props.value) : setPlaceholder(props.name);}
  }, [props.value])


  return (
        <input
          name={props.name}
          onChange={props.handleChange}
          className={`bg-very-dark-purple  w-full rounded-[20px] px-5 h-full placeholder:text-pearl ${ props.value ? "placeholder:text-opacity-100" : "placeholder:text-opacity-40"} outline-none`}
          type="text"
          required
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
  );
};

export default FormInput;
