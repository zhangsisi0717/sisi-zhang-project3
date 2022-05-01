import "./CreateNewGame.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import NaviBar from "../components/NaviBar";

export default function CreateNewGame() {
  const [username, setUsername] = useState(null);

  const [gameTitle, setGameTitle] = useState(null);

  const [gameDescription, setGameDescription] = useState(null);

  const navigate = useNavigate();

  function submitNewGame() {
    if (!gameTitle || !gameDescription) {
      return;
    }
    Axios.post("/game/create", {
      title: gameTitle,
      description: gameDescription,
    })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <NaviBar setUsername={setUsername} />
      <div className="create-new-game">
        {username ? (
          <div>
            <input
              type="text"
              placeholder="Game title"
              onChange={(e) => setGameTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descriptions"
              onChange={(e) => setGameDescription(e.target.value)}
            />
            <button onClick={submitNewGame}>Save</button>
          </div>
        ) : (
          <div>Please log in first</div>
        )}
      </div>
    </div>
  );
}
