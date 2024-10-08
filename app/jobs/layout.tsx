import React from 'react'
import Navbar from '@/components/Navbar';

const Jobslayout = ({
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

export default Jobslayout
