import React from 'react'
import Button from 'react-bootstrap/Button';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleAuthBtnComp() {
    return (
        <div>

            <Button variant="primary" type="submit" className="google-btn">
                <span className="google-icon"><FcGoogle /></span>
                Sign In with Google
            </Button>

        </div>
    )
}
