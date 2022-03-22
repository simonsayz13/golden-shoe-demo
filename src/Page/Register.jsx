import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { signUp } from "../Firebase/FirebaseHandler";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <Container fluid>
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <h1 className="display-6">Register</h1>
        </div>
        <div className="d-flex justify-content-center">
          <Form>
            <Form.Group className="mb-1" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                defaultValue={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
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

            <Form.Group className="mb-4" controlId="formBasicText">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                defaultValue={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>

            <Container>
              <Row className="justify-content-md-center">
                <Col md="6">
                  <Button
                    variant="primary"
                    onClick={() => {
                      signUp(username, email, password);
                    }}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </React.Fragment>
    </Container>
  );
};

export default Register;
