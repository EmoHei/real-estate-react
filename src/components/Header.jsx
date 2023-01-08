import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
    // useLocation show the current URL (location.pathname)
    const location = useLocation();
    const navigate = useNavigate();

    function pathMathRoute(router) {
        if (router === location.pathname) {
            return true;
        }
    }
    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
            <header className='
            flex 
            justify-between 
            items-center 
            px-3
            max-w-6xl
            mx-auto
            '>
                <div>
                    <img src='https://cdn.pixabay.com/photo/2016/04/19/06/57/logo-1338108_960_720.png'
                        alt='logo'
                        className='h-10 cursor-pointer'
                        onClick={()=>navigate('/')}
                    />
                    <span  >Real</span> <span>Estate</span> <span style={{ color: 'red' }}>Market</span>
                </div>

                <div>
                    <ul
                        className='flex space-x-10'>

                        <li className={`
                        py-3 
                        text-sm 
                        font-semibold
                        text-gray-400
                        border-b-[3px]
                        border-b-transparent
                        cursor-pointer
                        ${pathMathRoute('/') && "text-black border-b-red-500"}
                        `}
                            onClick={() => navigate('/')}
                        >Home</li>
                        <li className={`
                        py-3 
                        text-sm 
                        font-semibold
                        text-gray-400
                        border-b-[3px]
                        cursor-pointer
                          ${pathMathRoute('/offers') && "text-black border-b-red-500"}
                        `}
                            onClick={() => navigate('/offers')}
                        >Offers</li>
                        <li className={`
                        py-3 
                        text-sm 
                        font-semibold
                        text-gray-400
                        border-b-[3px]
                        cursor-pointer
                          ${pathMathRoute('/sign-in') && "text-black border-b-red-500"}
                        `}
                            onClick={() => navigate('/sign-in')}
                        >Sign In</li>
                    </ul>
                </div>

            </header>
        </div>
    )
}
