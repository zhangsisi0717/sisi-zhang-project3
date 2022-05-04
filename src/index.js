import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NaviBar from "./components/NaviBar";
import GamePage from "./components/GamePage";
import CreateNewGame from "./components/CreateNewGame";
import SearchResults from "./components/SearchResults";
import {
  Router,
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path={"/home"} element={<App />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path="/game/:gameTitle" element={<GamePage />} />
        <Route path="/createGame" element={<CreateNewGame />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/search" element={<App />} />
      </Routes>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
