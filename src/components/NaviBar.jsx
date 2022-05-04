import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import Axios from "axios";
import controller from "../img/game-controller-gamepad-svgrepo-com.svg";
import "./NaviBar.css";

export default function NaviBar(props) {
  const { state } = useLocation();
  const [username, setUsername] = useState(null);

  const [query, setQuery] = useState(null);

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

  function search() {
    if (!query) {
      return;
    }
    navigate("/search/" + encodeURIComponent(query));
  }

  return (
    <div className="navi-bar">
      <div className="gamiew">Gamiew</div>

      <a href="/home">
        <button className="home-button">Home</button>
      </a>
      {username ? (
        <a href="/createGame">
          <button className="create-game-button">NewGame</button>
        </a>
      ) : null}
      <div className="search-bar">
        <input
          className="search"
          placeholder="search game ..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={search}>
          Search
        </button>
      </div>

      <div className="user-name">
        {username ? (
          <div>
            <div className="username-display">
              <img className="username-icon" src={controller} />
              <div className="username-text">{username}</div>
            </div>
            <span>
              <button className="logout-button" onClick={logout}>
                LogOut
              </button>
            </span>
          </div>
        ) : (
          <div>
            <span>
              <button
                className="signup-button"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SignUp
              </button>
            </span>
            <span>
              <button
                className="login-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                LogIn
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
