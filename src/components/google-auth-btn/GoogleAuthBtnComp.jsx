import React from 'react'
import Button from 'react-bootstrap/Button';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleAuthBtnComp() {
    return (
        <div>

            <Button variant="primary" type="button" className="google-btn">
                <span className="google-icon"><FcGoogle /></span>
                Continue with Google
            </Button>

        </div>
    )
}
