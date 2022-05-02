import "./CreateNewGame.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import NaviBar from "../components/NaviBar";

export default function CreateNewGame() {
  const [username, setUsername] = useState(null);

  const [gameTitle, setGameTitle] = useState(null);

  const [gameDescription, setGameDescription] = useState(null);

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  function submitNewGame() {
    if (!gameTitle || !gameDescription) {
      return;
    }
    Axios.post("/game/create", {
      title: gameTitle,
      description: gameDescription,
    })
      .then((response) => {
        const gameURL = "/game/" + encodeURIComponent(response.data.title);
        // navigate("/home");
        navigate(gameURL);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  }

  return (
    <div>
      <NaviBar setUsername={setUsername} />
      <div className="create-new-game">
        {username ? (
          <div className="create-new-game-inner">
            <div className="title-field">
              <div className="text-prompt">Game title</div>
              <textarea
                className="game-title-input"
                type="text"
                onChange={(e) => setGameTitle(e.target.value)}
              />
            </div>
            <div className="description-field">
              <div className="text-prompt">Description</div>
              <textarea
                className="game-description-input"
                type="text"
                spellCheck="on"
                onChange={(e) => setGameDescription(e.target.value)}
              />
            </div>
            <button className="save-button" onClick={submitNewGame}>
              Save
            </button>
            {message ? <div className="new-game-message">{message}</div> : null}
          </div>
        ) : (
          <div>Please log in first</div>
        )}
      </div>
    </div>
  );
}
