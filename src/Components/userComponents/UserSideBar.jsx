import React from 'react'
import { ImProfile } from 'react-icons/im'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { RiDeleteBin6Fill, RiProfileLine } from 'react-icons/ri'
import { Si1Password } from 'react-icons/si'
import { NavLink } from 'react-router-dom'

const UserSideBar = () => {
  return (
    <section className='p-7 '>
        <article>
            <ul className='flex flex-col gap-4'>
                <li><NavLink end to={"/user-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><MdAccountBalanceWallet/></span><span>My Account</span></NavLink></li>
                <li><NavLink to={"update-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><ImProfile /></span><span>Update Profile</span></NavLink></li>
                <li><NavLink to={"add-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RiProfileLine /></span><span>Add Profile</span></NavLink></li>
                <li><NavLink to={"update-password"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><Si1Password /></span><span>Update Password</span></NavLink></li>
                <li><NavLink to={"delete-account"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RiDeleteBin6Fill /></span><span>Delete Account</span></NavLink></li>
            </ul>
        </article>
    </section>
  )
}

export default UserSideBar
