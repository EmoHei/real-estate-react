import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { getAuth } from 'firebase/auth'
import '../profile/Profile.css';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate('/')
  }
  return (
    <div>
      <>
        <section className="form-section">
          <h1 className='title'>My Profile</h1>
          <div className='form-container'>

            <Form>
              {/* Name Input */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" id='name' value={name} className="name-input" disabled="true" />
              </Form.Group>

              {/* Email Input */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" id='email' value={email} className="name-input" disabled="true" />
              </Form.Group>

              <Form.Group className="mb-3 edit-sign-out-form-group" controlId="formBasicEmail">
                <Form.Label>Do you want to change your name?  <span> Edit</span></Form.Label>
                <p onClick={onLogout}>Sign Out</p>
              </Form.Group>
              {/* Button */}
              <Button variant="primary" type="submit">
                Sell or rent your home
              </Button>
            </Form>
          </div>
        </section>
      </>
    </div>
  )
}
