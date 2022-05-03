import { useParams } from "react-router";

import ReviewEntry from "../components/ReviewEntry";
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

import "./GamePage.css";

import { useNavigate } from "react-router";
import NaviBar from "../components/NaviBar";

import gameIcon1 from "../img/game-icon-1.svg";
import gameIcon2 from "../img/game-icon-2.svg";
import gameIcon3 from "../img/game-icon-3.svg";
import gameIcon4 from "../img/game-icon-4.svg";

export default function GamePage() {
  const gameIcons = [gameIcon1, gameIcon2, gameIcon3, gameIcon4];
  const pathParams = useParams();
  const gameTitle = decodeURIComponent(pathParams.gameTitle);

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [newGameDescription, setNewGameDescription] = useState(null);
  const [newGamePublisher, setNewGamePublisher] = useState(null);
  const [newGameUrl, setNewGameUrl] = useState(null);

  const [newReviewRating, setNewReviewRating] = useState(null);
  const [newReviewContent, setNewReviewContent] = useState(null);

  const ratingInputRef = useRef(null);
  const contentInputRef = useRef(null);

  const [icon, setIcon] = useState(null);

  const navigate = useNavigate();

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  useEffect(() => {
    Axios.post("/game/get", {
      title: gameTitle,
    })
      .then((response) => {
        //   console.log(response.data);
        setGame(response.data);
        setIcon(gameIcons[Math.floor(Math.random() * gameIcons.length)]);
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
      publisher: newGamePublisher,
      url: newGameUrl,
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
          <div className="game-area">
            <img className="game-title-icon" src={icon} />
            <div className="game-info-box">
              <div className="title-field">
                <div className="game-title-text">
                  <b>{game.title}</b>
                </div>
              </div>
              {isEdit ? (
                <div className="description-field">
                  <div className="description-field-inner">
                    <div className="text-prompt">Publisher</div>
                    <textarea
                      className="game-publisher-input"
                      type="text"
                      defaultValue={game.publisher}
                      onChange={(e) => setNewGamePublisher(e.target.value)}
                    />
                  </div>
                  <div className="description-field-inner">
                    <div className="text-prompt">Link</div>
                    <textarea
                      className="game-url-input"
                      type="text"
                      defaultValue={game.url}
                      onChange={(e) => setNewGameUrl(e.target.value)}
                    />
                  </div>
                  <div className="description-field-inner">
                    <div className="text-prompt">Description</div>
                    <textarea
                      className="game-description-input"
                      type="text"
                      defaultValue={game.description}
                      onChange={(e) => setNewGameDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <button className="save-button" onClick={submitEditGame}>
                      save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => {
                        setIsEdit(false);
                        setNewGameDescription(null);
                        setNewGamePublisher(null);
                        setNewGameUrl(null);
                      }}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="description-field">
                  <div className="description-field-inner">
                    <div className="game-description-text">
                      <b>Updated:</b>{" "}
                      {new Date(game.releaseDate).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )}
                    </div>
                    <div className="game-description-text">
                      <b>Publisher:</b> {game.publisher}
                    </div>
                    <div className="game-description-text">
                      <b>Link:</b> <a href={game.url}>{game.url}</a>
                    </div>
                  </div>
                  <div className="description-field-inner">
                    <div className="game-description-text">
                      {game.description}
                    </div>
                  </div>
                </div>
              )}
              {game.username === username && !isEdit ? (
                <div>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setIsEdit(true);
                      setNewGameDescription(game.description);
                      setNewGamePublisher(game.publisher);
                      setNewGameUrl(game.url);
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-button" onClick={deleteSelf}>
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          </div>
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
