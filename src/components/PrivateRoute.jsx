import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import SpinnerComp from './spinner/SpinnerComp';

export default function PrivateRoute() {

    const {loggedIn, checkingStatus} = useAuthStatus();
    if(checkingStatus){
        return <SpinnerComp/>
    }
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />


}
 // import PrivateRoute in App.js
