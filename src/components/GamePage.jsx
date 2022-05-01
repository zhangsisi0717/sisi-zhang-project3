import { useParams } from "react-router";

import ReviewEntry from "../components/ReviewEntry";
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

import "./GamePage.css";

import { useNavigate } from "react-router";
import NaviBar from "../components/NaviBar";

export default function GamePage() {
  const pathParams = useParams();
  const gameTitle = decodeURIComponent(pathParams.gameTitle);

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [newGameDescription, setNewGameDescription] = useState(null);

  const [newReviewRating, setNewReviewRating] = useState(null);
  const [newReviewContent, setNewReviewContent] = useState(null);

  const ratingInputRef = useRef(null);
  const contentInputRef = useRef(null);

  const navigate = useNavigate();

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
      setNewGameDescription(null);
    });
  }

  function submitNewReview() {
    if (!game || !newReviewRating || !newReviewContent) {
      return;
    }
    Axios.post("/review/create", {
      content: newReviewContent,
      gameTitle: game.title,
      rating: newReviewRating,
    })
      .then((response) => {
        setNewReviewContent(null);
        setNewReviewRating(null);
        setReviews([response.data, ...reviews]);
        ratingInputRef.current.value = null;
        contentInputRef.current.value = null;
      })
      .catch((err) => console.log(err.message));
  }

  function deleteSelf() {
    if (!game) {
      return;
    }
    Axios.post("/game/delete", { title: game.title })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <NaviBar setUsername={setUsername} />
      {game ? (
        <div className="game-page">
          {game.username === username && !isEdit ? (
            <div>
              <button
                onClick={() => {
                  setIsEdit(true);
                  setNewGameDescription(game.description);
                }}
              >
                Edit
              </button>
              <button onClick={deleteSelf}>Delete</button>
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
              <button onClick={submitEditGame}>save</button>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setNewGameDescription(null);
                }}
              >
                cancel
              </button>
            </div>
          ) : (
            <div>description: {game.description}</div>
          )}
          {username ? (
            <div>
              <h2>New review </h2>
              <input
                type="number"
                placeholder="Rating (1 to 5)"
                ref={ratingInputRef}
                onChange={(e) => {
                  setNewReviewRating(Number.parseInt(e.target.value));
                }}
              />
              <input
                type="text"
                placeholder="Content of your review"
                ref={contentInputRef}
                onChange={(e) => setNewReviewContent(e.target.value)}
              />
              <button onClick={submitNewReview}>Save</button>
            </div>
          ) : null}
          <div className="reviews">
            {reviews.map((review, idx) => (
              <ReviewEntry
                key={review._id}
                review={review}
                username={username}
                deleteReviewFunction={() => {
                  setReviews(reviews.filter((ele, index) => index !== idx));
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>Game not found</div>
      )}
    </div>
  );
}
