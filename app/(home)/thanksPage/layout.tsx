import SuspenseWrapper from '@/components/suspense/SuspenseWrapper'
import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div>
         <SuspenseWrapper>
         {children}
         </SuspenseWrapper>
    </div>
  )
}

export default layout