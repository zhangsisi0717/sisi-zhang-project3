import { useParams } from "react-router";

import ReviewEntry from "../components/ReviewEntry";
import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./GamePage.css";

import NaviBar from "../components/NaviBar";

export default function GamePage() {
  const pathParams = useParams();
  const gameTitle = decodeURIComponent(pathParams.gameTitle);

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [newGameDescription, setNewGameDescription] = useState(null);

  useEffect(() => {
    Axios.post("/game/get", {
      title: gameTitle,
    })
      .then((response) => {
        //   console.log(response.data);
        setGame(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    Axios.post("/game/getReviews", {
      title: gameTitle,
    })
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function submitEditGame() {
    if (!game) {
      return;
    }
    Axios.post("/game/edit", {
      title: game.title,
      description: newGameDescription,
    }).then((response) => {
      setGame(response.data);
      setIsEdit(false);
    });
  }

  return (
    <div>
      <NaviBar setUsername={setUsername} />
      {game ? (
        <div className="game-page">
          {game.username === username && !isEdit ? (
            <div>
              <button onClick={() => setIsEdit(true)}>Edit</button>
            </div>
          ) : null}
          <div> game title: {game.title}</div>
          {isEdit ? (
            <div>
              <input
                type="text"
                defaultValue={game.description}
                onChange={(e) => setNewGameDescription(e.target.value)}
              />
              <button onClick={submitEditGame}>submit</button>
            </div>
          ) : (
            <div>description: {game.description}</div>
          )}
          {reviews.map((review) => (
            <ReviewEntry review={review} />
          ))}
        </div>
      ) : (
        <div>Game not found</div>
      )}
    </div>
  );
}
