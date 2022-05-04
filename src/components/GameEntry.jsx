import "./GameEntry.css";
import React from "react";

export default function GameEntry(props) {
  const date = new Date(props.game.releaseDate);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return (
    <div className="game-entry">
      <img src={props.icon} className="game-icon" />
      <div className="game-info">
        <a
          href={"/game/" + encodeURIComponent(props.game.title)}
          className="game-title"
        >
          {props.game.title}
        </a>
        <div>
          <b>Updated:</b> {date.toLocaleDateString("en-US", options)} (@
          {props.game.username})
        </div>
        <div>
          <b>Publisher:</b> {props.game.publisher}
        </div>
        <div>
          <b>Link:</b>{" "}
          <a className="game-link" href={props.game.url}>
            {props.game.url}
          </a>
        </div>
        <div>{props.game.description}</div>
      </div>
    </div>
  );
}
