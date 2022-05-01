import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import Axios from "axios";
import "./NaviBar.css";

export default function NaviBar(props) {
  const { state } = useLocation();
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/user/isLoggedIn")
      .then((response) => {
        setUsername(response.data.username);
        if (props.setUsername) {
          props.setUsername(response.data.username);
        }
      })
      .catch((error) => console.log("User is not logged in"));
  }, [state]);

  function logout() {
    console.log("logout called react");
    Axios.post("/user/logout")
      .then((response) => {
        setUsername(null);
        navigate("/home");
      })
      .catch((error) => console.log("Error logging out"));
  }

  return (
    <div className="navi-bar">
      <div className="gamiew">Gamiew</div>

      <a href="/home">
        <button className="home-button">Home</button>
      </a>
      <input className="search" placeholder="search game here.." />

      <div className="user-name">
        {username ? (
          <div>
            <span className="username-text">{username}</span>
            <span>
              <button onClick={logout}>Log Out</button>
            </span>
          </div>
        ) : (
          <div>
            <span className="username-text">Not logged in</span>
            <span>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </span>
            <span>
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
