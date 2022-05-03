const express = require("express");

const UserModel = require("./model/user.model");
const ReviewModel = require("./model/review.model");
const GameModel = require("./model/game.model");
const jwt = require("jsonwebtoken");
const auth_middleware = require("./middleware/auth_middleware");
const router = express.Router();

//create a new game
router.post("/create", auth_middleware, function (request, response) {
  if (!request.body.title) {
    return response.status(400).send("missing game title.");
  }

  const newGame = {
    title: request.body.title,
    description: request.body.description,
    username: request.username,
    publisher: request.body.publisher,
    url: request.body.url,
  };

  return GameModel.createGame(newGame)
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

// find a game by title
router.post("/get", function (request, response) {
  const title = request.body.title;
  if (!title) {
    response.status(401).send("missing game title.");
  }
  return GameModel.getGameByTitle(title)
    .then((game) => {
      if (!game) {
        response.status(400).send("Game not found.");
      } else {
        response.status(200).send(game);
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send(error);
    });
});

//update a game's description
router.post("/edit", auth_middleware, function (request, response) {
  if (!request.body.title) {
    return response.status(400).send("missing game title.");
  }

  if (
    !request.body.description &&
    !request.body.publisher &&
    !request.body.url
  ) {
    return response.status(400).send("missing update data.");
  }

  let update = {};
  if (request.body.description) {
    update.description = request.body.description;
  }
  if (request.body.publisher) {
    update.publisher = request.body.publisher;
  }
  if (request.body.url) {
    update.url = request.body.url;
  }
  update.releaseDate = Date.now();

  return GameModel.getGameByTitle(request.body.title)
    .then((game) => {
      if (!game) {
        throw new Error("NotFound");
      }
      if (game.username != request.username) {
        throw new Error("Unauthorized");
      }
      return GameModel.updateGame(request.body.title, update);
    })
    .then((dbResponse) => {
      return response.status(200).send(dbResponse);
    })
    .catch((error) => {
      console.log(error);
      if (error.message == "NotFound") {
        return response.status(400).send("Game not found.");
      } else if (error.message == "Unauthorized") {
        return response
          .status(401)
          .send("Cannot edit game created by another user.");
      }
      return response.status(400).send(error);
    });
});

router.post("/delete", auth_middleware, function (request, response) {
  if (!request.body.title) {
    return response.status(400).send("missing game title");
  }

  return GameModel.getGameByTitle(request.body.title)
    .then((game) => {
      if (!game) {
        throw new Error("NotFound");
      }
      if (game.username != request.username) {
        throw new Error("Unauthorized");
      }
      return GameModel.deleteGameByTitle(request.body.title);
    })
    .then((dbResponse) => {
      return response.status(200).send(dbResponse);
    })
    .catch((error) => {
      console.log(error);
      if (error.message == "Unauthorized") {
        return response
          .status(401)
          .send("Cannot delete game created by another user.");
      }
      if (error.message == "NotFound") {
        return response.status(400).send("Game not found.");
      }
      return response.status(400).send(error);
    });
});

router.post("/getReviews", function (request, response) {
  const gameTitle = request.body.title;
  if (!gameTitle) {
    return response.status(400).send("missing game title");
  }

  return ReviewModel.getReviewsByGameTitle(gameTitle)
    .then((data) => {
      return response.status(200).send(data);
    })
    .catch((error) => {
      return response.status(400).send(error);
    });
});

router.get("/getAll", function (request, response) {
  return GameModel.getAllGames()
    .then((dbResponse) => {
      return response.status(200).send(dbResponse);
    })
    .catch((error) => {
      response.status(400).send(error.message);
    });
});

router.post("/search", function (request, response) {
  if (!request.body.query) {
    return response.status(400).send("Missing query.");
  }
  if (typeof request.body.query !== "string") {
    return response.status(400).send("query must be a string.");
  }

  return GameModel.searchGames(request.body.query)
    .then((dbResponse) => {
      return response.status(200).send(dbResponse);
    })
    .catch((error) => {
      response.status(400).send(error.message);
    });
});

module.exports = router;
