import "./SearchResults.css";
import GameEntry from "../components/GameEntry";

import NaviBar from "../components/NaviBar";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router";

function SearchResults() {
  const [games, setGames] = useState([]);

  const pathParams = useParams();

  const query = decodeURIComponent(pathParams.query);

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
        <div>Search results for {query}</div>
        {games.map((game) => (
          <GameEntry key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
