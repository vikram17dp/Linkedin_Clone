import React from 'react'
import Navbar from './Navbar'

export default function Layout({children}) {
  return (
    <div className='min-h-screen bg-white '>
        <Navbar/>
        <main className='max-w-7xl mx-auto px-4 py-6'>
        {children}
        </main>
    </div>
  )
}
