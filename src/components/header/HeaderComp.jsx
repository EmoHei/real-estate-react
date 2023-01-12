import React from 'react'
import {  useNavigate,NavLink } from 'react-router-dom'
import "../header/HeaderComp.css"
export default function Header() {
   
    const navigate = useNavigate();
return (
    
        <div className='div-container'>
            <header >
            
                <div className="logo-container">
                    <img src='https://cdn.pixabay.com/photo/2016/04/19/06/57/logo-1338108_960_720.png'
                        alt='logo'
                        className='logo-image'
                        onClick={()=>navigate('/')}
                    />
                    <span>Real Estate Market</span>
                </div>

                <div className="nav-menu-container">
                    <ul
                        className='flex space-x-10'>

                        <li > <NavLink to='/' >Home</NavLink> </li>
                        <li > <NavLink to='/offers' >Offers</NavLink> </li>
                        <li > <NavLink to='/sign-in' >SignIn</NavLink> </li>
                        
                    </ul>
                </div>

            </header>
        </div>
    )
}