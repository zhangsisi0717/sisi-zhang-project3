import "./Signup.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import NaviBar from "../components/NaviBar";

function Signup() {
  const [curUserName, setCurUserName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  function submit() {
    if (!username || !password || !password2) {
      setMessage("please fill in all fields");
      return;
    } else if (password !== password2) {
      setMessage("The two passwords you entered do not match.");
      return;
    }

    console.log(`submitted; username=${username}, password=${password}`);

    Axios.post("/user/create", {
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
        <div className="signup">Already logged in as {curUserName}</div>
      ) : (
        <div className="signup">
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
          <div className="password2-field">
            <div className="text-prompt">Re-enter Password</div>
            <input
              className="password2-input"
              placeholder="Re-enter password"
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button className="submit-button" onClick={submit}>
            Submit
          </button>
          {message ? <div className="message">{message}</div> : null}
        </div>
      )}
    </div>
  );
}

export default Signup;
