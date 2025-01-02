import React, { useEffect, useState } from 'react'
// import { route_links } from '../constants/routes_links'
import { Link } from 'react-router-dom'
import { other_links, staffs_links, students_links } from '../constants/routes_links';

const Sidebar = () => {
  const[route_links,setRouteLinks] = useState([]);
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const isAdmin = userData?.role=="admin";
    const isStudent = userData?.role=="student";
    const isStaff = userData?.role=="staff";
    setRouteLinks(isAdmin?[...other_links,...students_links,...staffs_links]:isStudent?students_links:staffs_links);
  },[])
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
