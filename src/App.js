
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './components/PrivateRoute';
import Home from "./pages/home/Home";
import Offers from "./pages/offers/Offers";
import Profile from "./pages/profile/Profile";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Header from "./components/header/HeaderComp";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './pages/create/Create';
import Edit from './pages/edit/Edit';
import NotFound from './pages/not-Found/NotFound';
import Details from './pages/details/Details';


function App() {
  return (
    <>
      <Router>
        <Header></Header>

        <Routes>
          <Route path="/" element={<Home></Home>} />

          <Route path='/profile' element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/details/:id" element={<Details/>} />
          <Route path="/update/:id" element={<Edit />} />


          <Route path="/sign-in" element={<SignIn></SignIn>} />
          <Route path="/sign-up" element={<SignUp></SignUp>} />
          <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
          <Route path="/offers" element={<Offers></Offers>} />

          <Route path="/create" element={<PrivateRoute />} >
            <Route path="/create" element={<Create></Create>} />
          </Route>
          <Route path="edit" element={<PrivateRoute />}>
            <Route path="/edit/:listingId" element={<Edit/>} />
          </Route>
          
          <Route path="/logout" element={<PrivateRoute />} >
            <Route path="/logout" element={<Home></Home>} />
          </Route>
          <Route path="edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<Edit/>} />
          </Route>

          <Route path="*" element={<NotFound/>} />
        </Routes>

      </Router>
      {/* Notification */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
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
