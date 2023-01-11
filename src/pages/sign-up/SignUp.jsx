import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import GoogleAuthBtnComp from '../../components/google-auth-btn/GoogleAuthBtnComp';
import '../sign-up/SignUp.css';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', });
  const { name, email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))

  }
  return (
    <section>

      <h1 className="title">Sign Up</h1>

      <div className="main-container" >
        {/*className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6"  */}
        <div className="image-container" >
          <Card className=" text-white">
            <Card.Img className="image-container-image" src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="key"
            />
          </Card>

        </div>
        {/* className="w-full md:w-[67%] lg:w-[40%] lg:ml-20" */}
        <div className="form-container" >
          <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Full Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  id="name"
                  className="form-input"
                  value={name}
                  required
                  onChange={onChange}

                />
              </FloatingLabel>
              <div>

              </div>
              <FloatingLabel
                controlId="floatingInput"
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

              <div className="password-container">
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                >
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    id="password"
                    className="form-input"
                    value={password}
                    required
                    onChange={onChange}
                  />
                </FloatingLabel>

                {showPassword ? (<AiFillEyeInvisible className="password-eye"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
                ) : (<AiFillEye className="password-eye"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />)}
              </div>

              <FloatingLabel className="forgot-password-container">
                <span>Already have an account?<span><Link style={{ color: 'red', textDecoration: 'none' }} to='/sign-in' > Sign In</Link></span> </span>
                <span> <Link style={{ color: 'blue', textDecoration: 'none' }} to='/forgot-password' >Forgot Password</Link></span>
              </FloatingLabel>
              <Button variant="primary" type="submit" className="submit-btn">
                Submit
              </Button>
              <div className="or-container">
                <hr />
                <p className="or">OR</p>
                <hr />
              </div>
              <GoogleAuthBtnComp></GoogleAuthBtnComp>
            </Form.Group>
          </Form>

        </div>

      </div>
    </section>
  );
}
