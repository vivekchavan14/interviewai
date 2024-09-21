'use client';

import React, { useEffect } from 'react'

const page = ({params}) => {
  
  useEffect(()=>{
    console.log(params.interviewId)
  },[])


  return (
    <div>
       <h1>Interview Panel</h1>
    </div>
  )
}

export default page
