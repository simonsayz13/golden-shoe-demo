import "./App.css";
import React from "react";
import NavigationBar from "./Components/NavigationBar";
import LiveChat from "./Components/LiveChat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Basket from "./Page/Basket";
import Dashboard from "./Page/Dashboard";
import Register from "./Page/Register";
import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [basket, setBasket] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [userID, setUserID] = useState("");

  return (
    <Router>
      <NavigationBar
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route
          path=""
          element={<Home cartCount={cartCount} setCartCount={setCartCount} />}
        />
        <Route
          path="/home"
          element={
            <Home
              cartCount={cartCount}
              setCartCount={setCartCount}
              setBasket={setBasket}
              basket={basket}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setUsername={setUsername}
              setIsLoggedIn={setIsLoggedIn}
              setIsLoginSuccess={setIsLoginSuccess}
              setUserID={setUserID}
            />
          }
        />
        <Route
          path="/basket"
          element={
            <Basket
              basket={basket}
              setIsOrderComplete={setIsOrderComplete}
              isLoggedIn={isLoggedIn}
              setCartCount={setCartCount}
              setBasket={setBasket}
              userID={userID}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              username={username}
              isLoginSuccess={isLoginSuccess}
              setIsLoginSuccess={setIsLoginSuccess}
              userID={userID}
              isOrderComplete={isOrderComplete}
              setIsOrderComplete={setIsOrderComplete}
            />
          }
        />

        <Route
          path="/register"
          element={<Register isLoggedIn={isLoggedIn} />}
        ></Route>
      </Routes>
      <LiveChat />
    </Router>
  );
};

export default App;
