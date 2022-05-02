import "./SearchResults.css";
import GameEntry from "../components/GameEntry";

import NaviBar from "../components/NaviBar";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router";

import gameIcon1 from "../img/game-icon-1.svg";
import gameIcon2 from "../img/game-icon-2.svg";
import gameIcon3 from "../img/game-icon-3.svg";
import gameIcon4 from "../img/game-icon-4.svg";

function SearchResults() {
  const gameIcons = [gameIcon1, gameIcon2, gameIcon3, gameIcon4];
  const [games, setGames] = useState([]);

  const pathParams = useParams();

  const query = decodeURIComponent(pathParams.query);

  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    Axios.post("/game/search", { query: query })
      .then((response) => {
        setGames(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [query]);

  console.log(games);

  // return <div className="app">This is my app.</div>;

  return (
    <div>
      <NaviBar />
      <div className="search-results">
        <div className="search-message">
          Search results for:{" "}
          <span className="query">
            <b>{query}</b>
          </span>{" "}
          ({games ? games.length : 0} found)
        </div>
        {games.map((game) => (
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

export default SearchResults;
