import React from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import "./App.css"
const App = () => {
  return (
    <div className='w-full flex h-screen'>
      <div className='w-[20%] h-screen bg-orange-300 overflow-y-auto scrollbar-hide'>
        <Sidebar/>
      </div>
      <div className='w-[80%] h-screen'>
        <Outlet/>
      </div>
    </div>
  )
}

export default App
