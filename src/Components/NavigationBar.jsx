import React from "react";
import "./NavBar.css";
import { Badge, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOut } from "../Firebase/FirebaseHandler";

const NavigationBar = ({ cartCount, isLoggedIn, username, setIsLoggedIn }) => {
  return (
    <React.Fragment>
      <ul>
        <li style={{ float: "left" }}>
          <Link to="/home">Golden Shoe</Link>
        </li>
        {isLoggedIn ? (
          <React.Fragment>
            <li style={{ float: "right" }}>
              <Link
                to="/home"
                onClick={() => {
                  setIsLoggedIn(false);
                  logOut();
                }}
              >
                Sign out
              </Link>
            </li>
            <li style={{ float: "right" }}>
              <Link to="/dashboard">{username}</Link>
            </li>
          </React.Fragment>
        ) : (
          <li style={{ float: "right" }}>
            <Link to="/login">Login</Link>
          </li>
        )}

        <li style={{ float: "right" }}>
          <Link to="/basket">
            Cart <Badge bg="warning">{cartCount}</Badge>
          </Link>
        </li>

        <li>
          <s>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search Products..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </s>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default NavigationBar;
