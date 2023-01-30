import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import "../header/HeaderComp.css";
import { Col, Container, Row } from 'react-bootstrap';

export default function Header() {

    const [isLogged, setIsLogged] = useState(false);
    const [profileName, setProfileName] = useState('')
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true)

                setProfileName(user.displayName)
            } else setIsLogged(false)
        })
    }, [auth])

    function onLogout() {
        auth.signOut();

    }

    return (

        <Container className='div-container'>
            <header >

                {/* <div className="logo-container">
                    <img src='https://cdn.pixabay.com/photo/2016/04/19/06/57/logo-1338108_960_720.png'
                        alt='logo'
                        className='logo-image'
                        onClick={() => navigate('/')}
                    />
                    <span>Real Estate Market</span>
                </div> */}

                <nav className="nav-menu-container">
                    <ul className='flex space-x-10'>
                        <Row>
                           
                            <Col style={{display:'flex'}}>
                                <li > <NavLink to='/' >Home</NavLink> </li>
                                <li > <NavLink to='/offers' >Offers</NavLink> </li>
                                {/* Guest */}
                                {!isLogged && <li ><NavLink to='/sign-in' >Login</NavLink> </li>}
                                {!isLogged && <li ><NavLink to='/sign-up' >Register</NavLink> </li>}
                                {/* Logged User */}
                                {isLogged && <li ><NavLink to='/profile' >Profile</NavLink> </li>}
                                {isLogged && <li ><NavLink to='/create' >Create</NavLink> </li>}
                                {isLogged && <li ><NavLink to='/logout' onClick={onLogout} > Logout</NavLink> </li>}
                            </Col>
                        </Row>



                    </ul>
                </nav>
            </header>
        </Container>
    )
}
