import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { signIn } from "../Firebase/FirebaseHandler";
import { Link } from "react-router-dom";

const Login = ({
  setIsLoggedIn,
  setUsername,
  setIsLoginSuccess,
  setUserID,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginIn = () => {
    signIn(email, password).then((user) => {
      setUsername(user.displayName);
      setUserID(user.uid);
    });
    setIsLoggedIn(true);
    setIsLoginSuccess(true);
  };

  return (
    <Container fluid>
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <h1 className="display-6">Login</h1>
        </div>
        <div className="d-flex justify-content-center">
          <Form>
            <Form.Group className="mb-0" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                defaultValue={password}
                autoComplete="on"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>

            <Container>
              <Row>
                <Col md={4}>
                  <Link to="/dashboard">
                    <Button
                      onClick={() => {
                        loginIn();
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                </Col>
                <Col md={{ span: 4, offset: 2 }}>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </React.Fragment>
    </Container>
  );
};

export default Login;
