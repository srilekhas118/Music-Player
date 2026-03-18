import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { IoIosAlbums } from 'react-icons/io'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { RiAlbumFill, RiDeleteBin6Fill, RiProfileLine } from 'react-icons/ri'
import { Si1Password } from 'react-icons/si'
import { NavLink } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <section className='p-7 '>
        <article>
            <ul className='flex flex-col gap-4'>
                <li><NavLink end to={"/admin"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><AiOutlineDashboard/></span><span>Dashboard</span></NavLink></li>
                <li><NavLink to={"/admin/create-album"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RiAlbumFill /></span><span>Create Album</span></NavLink></li>
                <li><NavLink to={"/admin/all-albums"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><IoIosAlbums /></span><span>All Albums</span></NavLink></li>
            </ul>
        </article>
    </section>
  )
}

export default AdminSideBar
