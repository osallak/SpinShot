import Image from "next/image"

export default function IconButton(props: {onclick: () => void, content: string, icon: string}) {
  return (
    <div className='rounded-full flex justify-center items-center bg-peridot py-1.5 md:w-44 w-32 md:h-10 h-7'>
      <button onClick={props.onclick} className='rounded-full md:text-xl text-sm w-full h-full font-Passion-One flex space-x-2 justify-center items-center text-very-dark-purple'>
        <Image className='md:w-6 w-5 md:h-6 h-5'
          src={props.icon}
          alt="channel's icons"
        />
        <span>{props.content}</span>
      </button>
    </div>
  )
}
