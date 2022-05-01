import "./Login.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import NaviBar from "../components/NaviBar";

function Login() {
  const [curUserName, setCurUserName] = useState(null);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  function submit() {
    console.log(`submitted; username=${username}, password=${password}`);
    if (!username || !password) {
      setMessage("username and password cannot be empty.");
      return;
    }
    Axios.post("/user/authenticate", {
      username: username,
      password: password,
    })
      .then((response) => {
        navigate("/home", { state: { username: response.data.username } });
      })
      .catch((err) => {
        setMessage(err.message);
      });
  }

  return (
    <div>
      <NaviBar setUsername={setCurUserName} />
      {curUserName ? (
        <div className="login">already logged in as {curUserName}</div>
      ) : (
        <div className="login">
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={submit}>Submit</button>
          {message ? <div>{message}</div> : <div></div>}
        </div>
      )}
    </div>
  );
}

export default Login;
