import React from 'react'
import Header from '../jobs/_components/Header';

const layout = ({
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


export default layout
