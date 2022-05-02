import "./GameEntry.css";
import React from "react";

export default function GameEntry(props) {
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
        <div>{props.game.releaseDate}</div>
        <div>{props.game.description}</div>
      </div>
    </div>
  );
}
