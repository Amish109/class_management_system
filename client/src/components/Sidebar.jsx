import React from 'react'
import { route_links } from '../constants/routes_links'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
      {
        route_links.map((element,index)=>{
          return (
            <div className='w-full flex justify-center p-10 border border-[black]' key={index}>
                <Link to={element.link}>{element.title}</Link>
            </div>
          )
        })
        // route_links.sort((a,b)=>{
        //   return a.title.localeCompare(b.title)
        // }).map((element,index)=>{
        //   return (
        //     <div className='w-full flex justify-center p-10 border border-[black]' key={index}>
        //         <Link to={element.link}>{element.title}</Link>
        //     </div>
        //   )
        // })
      }
    </div>
  )
}

export default Sidebar
