
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import Offers from "./pages/offers/Offers";
import Profile from "./pages/profile/Profile";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Header from "./components/header/HeaderComp";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   
      <>

      <Router>
        <Header></Header>
     
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/profile" element={<Profile></Profile>} />
          <Route path="/sign-in" element={<SignIn></SignIn>} />
          <Route path="/sign-up" element={<SignUp></SignUp>} />
          <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
          <Route path="/offers" element={<Offers></Offers>} />
        </Routes>
    
      </Router>
      {/* Notification */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    
      </>

  );
}

export default App;
