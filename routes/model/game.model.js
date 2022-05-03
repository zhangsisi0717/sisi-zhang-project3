const mongoose = require("mongoose");

const GameSchema = require("../schema/game.schema");

const GameModel = mongoose.model("Game", GameSchema);

function createGame(game) {
  return GameModel.create(game);
}

function getGameByUsername(username) {
  return GameModel.find({
    username: username,
  }).exec();
}

function getGameById(id) {
  return GameModel.findById(id).exec();
}

function getGameByTitle(title) {
  return GameModel.findOne({
    title: title,
  }).exec();
}

function getAllGames() {
  return GameModel.find()
    .sort([["releaseDate", -1]])
    .exec();
}

function searchGames(word) {
  return GameModel.find({ title: { $regex: word, $options: "i" } })
    .sort([["releaseDate", -1]])
    .exec();
}

function updateGame(title, update) {
  const filter = { title: title };
  return GameModel.findOneAndUpdate(filter, update, { new: true });
}

function deleteGameByTitle(title) {
  return GameModel.deleteOne({ title: title });
}

module.exports = {
  createGame,
  getGameByUsername,
  getGameById,
  getAllGames,
  getGameByTitle,
  updateGame,
  deleteGameByTitle,
  searchGames,
};
