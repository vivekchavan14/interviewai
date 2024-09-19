import React from 'react'
import Header from './_components/Header';

const Jobslayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  => {
  return (
    <div>
       <Header />
       {children}
    </div>
  )
}

export default Jobslayout
