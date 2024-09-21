import React from 'react'
import Navbar from '@/components/Navbar';

const Interviewlayout = ({
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

export default Interviewlayout
