import "./App.css";
import GameEntry from "../components/GameEntry";

import NaviBar from "../components/NaviBar";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router";

function App() {
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
          <GameEntry game={game} />
        ))}
      </div>
    </div>
  );
}

export default App;
