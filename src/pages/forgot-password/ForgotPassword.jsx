import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import '../forgot-password/ForgotPassword.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import { FcGoogle } from 'react-icons/fc';
import GoogleAuthBtnComp from "../../components/google-auth-btn/GoogleAuthBtnComp";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,

      [e.target.id]: e.target.value,
    }))
  }
  async function onForgotPassword(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset password')
    }
  }
  return (
    <section>

      <h1 className="title">Forgot password</h1>

      <div className="main-container" >
      
        <div className="image-container" >
          <Card className="bg-dark text-white">
            <Card.Img className="image-container-image" src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="key"
            />
          </Card>

        </div>
       
        <div className="form-container" >
          <Form onSubmit={onForgotPassword}>
            <Form.Group className="mb-3" id="formBasicEmail">
              <FloatingLabel
                id="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  id="email"
                  className="form-input"
                  value={email}
                  required
                  onChange={onChange}

                />
              </FloatingLabel>

              <FloatingLabel className="forgot-password-container">
                <span>Don't have an account?<span><Link style={{ color: 'red', textDecoration: 'none' }} to='/sign-in' > Register</Link></span> </span>
                <span> <Link style={{ color: 'blue', textDecoration: 'none' }} to='/sign-in' >Sign in instead</Link></span>
              </FloatingLabel>
            </Form.Group>

           
            <Button variant="primary" type="submit" className="submit-btn">
              SEND RESET EMAIL
            </Button>
            <GoogleAuthBtnComp></GoogleAuthBtnComp>
          </Form>

        </div>

      </div>
    </section>
  );
}
