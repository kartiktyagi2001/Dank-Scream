import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import logotitle from '../assets/logotitle.png'

export default function Navbar(){
    return(
        <div className='h-[12.3vh]'>
            <nav className='flex justify-between items-center bg-gray-800 text-white p-4'>
                <NavLink to="/" className='h-15 w-15'>
                    <img className='rounded-xl' src={logo} alt="" />
                </NavLink>

                <div className='flex space-x-4'>
                    <NavLink className='hover:text-fuchsia-800' to="/">Home</NavLink>
                    <NavLink className='hover:text-fuchsia-800' to="/new">Write</NavLink>
                    <NavLink className='hover:text-fuchsia-800' to="/auth">Sign in/up</NavLink>

                    <NavLink className='bg-fuchsia-900 pl-1 pr-1 rounded-md hover:bg-black hover:text-fuchsia-900 ' to="/signup">Dev</NavLink>
                </div>

                <NavLink to="/" className='h-15 w-15'>
                    <img className='rounded-xl' src={logotitle} alt="" />
                </NavLink>
            </nav>
        </div>
    )
}