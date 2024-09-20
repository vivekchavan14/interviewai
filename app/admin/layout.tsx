import Navbar from '@/components/Navbar';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  => {
  return (
    <div>
       <Navbar />
       {children}
    </div>
  )
}


export default layout
