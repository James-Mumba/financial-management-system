import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import { app } from "../Firebaze";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Signin() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const emailAddressRef = useRef();
  const passwordRef = useRef();

  function Login() {
    const emailAddress = emailAddressRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        const UserId = userCredential.user.uid;
        console.log(UserId);

        navigate("/Dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div className="Sign">
      <div className="profile"></div>

      <Form.Group controlId="formEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="johndoe@example.com"
          ref={emailAddressRef}
        />
      </Form.Group>
      <Form.Group controlId="formPasssword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="********"
          ref={passwordRef}
        />
      </Form.Group>

      <Button
        className="Button"
        onClick={Login}
        type="submit"
        variant="primary"
      >
        Login
      </Button>
      <p className="p" onClick={() => navigate("/Signup")}>
        Don't have an account? Sign Up
      </p>
    </div>
  );
}

export default Signin;
