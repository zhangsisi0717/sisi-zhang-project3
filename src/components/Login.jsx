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

  useEffect(() => {
    if (curUserName) {
      navigate("/home", { state: { username: curUserName } });
    }
  }, [curUserName]);

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
      <div className="login">
        <div className="username-field">
          <div className="text-prompt">Username</div>
          <input
            className="username-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-field">
          <div className="text-prompt">Password</div>
          <input
            className="password-input"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-button" onClick={submit}>
          Submit
        </button>
        {message ? <div className="message">{message}</div> : null}
      </div>
    </div>
  );
}

export default Login;
