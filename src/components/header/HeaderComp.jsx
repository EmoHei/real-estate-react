import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import "../header/HeaderComp.css";

export default function Header() {

    const [isLogged, setIsLogged] = useState(false);
    const [profileName ,setProfileName] =useState('')
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true)
            
               setProfileName (user.displayName) 
            } else setIsLogged(false)
        })
    }, [auth])
 
    return (

        <div className='div-container'>
            <header >

                <div className="logo-container">
                    <img src='https://cdn.pixabay.com/photo/2016/04/19/06/57/logo-1338108_960_720.png'
                        alt='logo'
                        className='logo-image'
                        onClick={() => navigate('/')}
                    />
                    <span>Real Estate Market</span>
                </div>

                <div className="nav-menu-container">
                    <ul className='flex space-x-10'>
                        
                        <li > <NavLink to='/' >Home</NavLink> </li>
                        <li > <NavLink to='/offers' >Offers</NavLink> </li>
                        {/* Guest */}
                        {!isLogged && <li ><NavLink to='/sign-in' >Sign in</NavLink> </li>}
                        {/* Logged User */}
                        {isLogged && <li ><NavLink to='/profile' >{profileName}'s profile</NavLink> </li>}

                    </ul>
                </div>
            </header>
        </div>
    )
}
