import React, { ReactNode } from 'react'
type Props = {
    icons: ReactNode,
}
export default function SocialCard({icons}: Props) {
  return (
    <button 
    className='w-full flex items-center justify-center px-4 py-3 rounded-md bg-light-bg dark:bg-dark-bg
     shadow-shadown_hover hover:shadow-cyan-500/50 hover:scale-90 transition-all ease-linear
    '
    >
      {icons}
    </button>
  )
}
