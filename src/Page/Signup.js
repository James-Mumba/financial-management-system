import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import { app } from "../Firebaze";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function Signup() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const FullnameRef = useRef();
  const emailAddressRef = useRef();
  const passwordRef = useRef();

  function reg() {
    // const Fullname = FullnameRef.current.value;
    const emailAddress = emailAddressRef.current.value;
    const password = passwordRef.current.value;

    createUserWithEmailAndPassword(auth, emailAddress, password)
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
      <div>
        <div className="content">
          <Form.Group className="Group" controlId="formName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="userName"
              placeholder="john doe"
              ref={FullnameRef}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="johndoe@example.com"
              ref={emailAddressRef}
            />
          </Form.Group>
          <Form.Group controlId="fromPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              ref={passwordRef}
            />
          </Form.Group>
        </div>
        <Button
          className="Button"
          variant="secondary"
          type="submit"
          onClick={reg}
        >
          Sign Up
        </Button>
        <p className="p" onClick={() => navigate("/")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Signup;
