import "./App.css";
import GameEntry from "../components/GameEntry";

import NaviBar from "../components/NaviBar";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router";

import gameIcon1 from "../img/game-icon-1.svg";
import gameIcon2 from "../img/game-icon-2.svg";
import gameIcon3 from "../img/game-icon-3.svg";
import gameIcon4 from "../img/game-icon-4.svg";

function App() {
  const gameIcons = [gameIcon1, gameIcon2, gameIcon3, gameIcon4];
  const [games, setGames] = useState([]);

  useEffect(() => {
    Axios.get("/game/getAll")
      .then((response) => {
        setGames(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(games);

  // return <div className="app">This is my app.</div>;

  return (
    <div>
      <NaviBar />
      <div className="app">
        {games.map((game) => (
          // <div>{game.title}</div>
          <GameEntry
            key={game._id}
            game={game}
            icon={gameIcons[Math.floor(Math.random() * gameIcons.length)]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
