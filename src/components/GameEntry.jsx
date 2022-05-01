import "./GameEntry.css";
import React from "react";

export default function GameEntry(props) {
  return (
    <div className="game-entry">
      <div>
        <a href={"/game/" + encodeURIComponent(props.game.title)}>
          {props.game.title}
        </a>
      </div>
      <div>{props.game.releaseDate}</div>
      <div>{props.game.description}</div>
    </div>
  );
}
