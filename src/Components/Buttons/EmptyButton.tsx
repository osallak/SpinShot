import React from 'react'

export default function EmptyButton(props: {onclick: () => void, content: string}) {
  return (
    <div className='md:w-40 w-32 md:h-10 h-7 rounded-full flex justify-center items-center'>
      <button onClick={props.onclick} className='font-Passion-One text-pearl md:text-xl text-sm'>
        {props.content}
      </button>
    </div>
  )
}
