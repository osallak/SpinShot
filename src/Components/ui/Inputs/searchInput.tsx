import Image from "next/image"
import searchInput from "../../../../public/searchInput.svg"
import { ChangeEvent, useState } from "react"

const SearchInput = () => {

  const [searchValue, setSearchValue] = useState("");

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchValue(event.target.value);
  }

  return(
    <div className="pl-4 space-x-2 bg-very-dark-purple rounded-full w-full h-full flex justify-center items-center flex-row">
      <Image src={searchInput} alt="search Input" className="w-6"/>
      <div className="w-full h-full">
        <input placeholder="Search ..." className="text-pearl w-full h-full outline-none placeholder:text-pearl font-light placeholder:opacity-50 font-Poppins text-lg bg-transparent" type="search" value={searchValue} onChange={(event) => search(event)} />
      </div>
    </div>
  )
}

export default SearchInput