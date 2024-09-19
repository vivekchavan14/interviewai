'use client'

import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoIosFlash} from 'react-icons/io'
 
const Header = () => {
  const path = usePathname()

  const isActive = (route: string) => path === route

  return (
    <header className='bg-slate-800 text-white'>
      <div className='container mx-auto flex p-4 items-center justify-between'>
        <div className="group flex items-center space-x-2">
          <IoIosFlash className="text-gray-400 group-hover:text-blue-500" />
          <span className="hidden sm:inline-block">InterviewAI.</span>
        </div>

        <nav>
          <ul className='flex gap-10 text-slate-200'>
            <li className={`cursor-pointer ${isActive('/jobs') ? 'font-bold text-blue-500' : 'hover:text-slate-100'}`}>
              Jobs
            </li>
            <li className="relative group cursor-pointer">
              <span className={`cursor-pointer ${isActive('/services') ? 'font-bold text-blue-500' : 'hover:text-slate-100'}`}>
                Services
              </span>
              
              <ul className="absolute left-0 mt-2 hidden group-hover:block bg-slate-700 text-white">
                <li className="px-4 py-2 hover:bg-slate-600">Consulting</li>
                <li className="px-4 py-2 hover:bg-slate-600">Development</li>
                <li className="px-4 py-2 hover:bg-slate-600">Support</li>
              </ul>
            </li>
            
            <li>
              <input
                type="text"
                placeholder="Search..."
                className="px-2 py-1 text-black rounded"
              />
            </li>
            <li>
              <a
                href="/contact"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>

        <UserButton />
      </div>
    </header>
  )
}

export default Header
