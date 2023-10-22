import Image from "next/image"
import searchInput from "../../../../public/searchInput.svg"
import { ChangeEvent, useState, useEffect, useRef } from "react"

type Array = {
  icon: string,
  messages: string,
  userName: string,
}

type Content = {
  data: Array[]
}

const SearchInput = (props: {setValue: Function}) => {

  const [searchValue, setSearchValue] = useState("");

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    props.setValue(event.target.value);
  }

  const handleBlur = () => {
    setSearchValue("");
  }

  return(
    <div className="pl-4 space-x-2 bg-very-dark-purple rounded-full w-full h-full flex justify-center items-center flex-row">
      <Image src={searchInput} alt="search Input" className="md:w-6 sm:w-5 w-4"/>
      <div className="w-full h-full">
        <input onBlur={handleBlur} placeholder="Search ..." className="text-pearl w-full h-full outline-none placeholder:text-pearl font-light placeholder:opacity-40 font-Poppins md:text-lg sm:text-base text-sm bg-transparent" type="search" value={searchValue} onChange={(event) => search(event)} />
      </div>
    </div>
  )
}

export default SearchInput
