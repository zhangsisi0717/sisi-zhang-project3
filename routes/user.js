const express = require("express");

const UserModel = require("./model/user.model");
const ReviewModel = require("./model/review.model");
const jwt = require("jsonwebtoken");
const auth_middleware = require("./middleware/auth_middleware");
const router = express.Router();

//1. User login to the application using credentials.
//2. The server verifies the credentials, generates a token and signs it with a secret key, and sends it back to the browser.
router.post("/authenticate", function (request, response) {
  console.log("authenticate called");
  const { username, password } = request.body;

  return UserModel.getUserByUserName(username)
    .then((user) => {
      if (user.password === password) {
        const payload = {
          username: username,
        };
        //jwt.sign(), 2nd argument is the secret key
        const token = jwt.sign(payload, "SUPER_SECRET", {
          expiresIn: "14d",
        });
        return response
          .cookie("token", token, { httpOnly: true })
          .status(200)
          .send({ username });
      }

      return response.status(401).send("Invalid password");
    })
    .catch((error) => {
      response.status(400).send("There was an error");
    });
});

//logout
router.post("/logout", auth_middleware, function (request, response) {
  console.log("logout url");
  const token = jwt.sign({}, "SUPER_SECRET", {
    expiresIn: "0d",
  });
  return response.cookie("token", token, { httpOnly: true }).status(200).send();
});

router.get("/isLoggedIn", auth_middleware, function (request, response) {
  return response.status(200).send({ username: request.username });
});

router.get("/:username", function (request, response) {
  const username = request.params.username;

  return UserModel.getUserByUserName(username)
    .then((user) => {
      response.status(200).send(user);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

//create user
router.post("/", function (request, response) {
  console.log("api/user called");
  const { username, password } = request.body;

  if (!username || !password) {
    response.status(401).send("Missing username or password argument");
  }

  const user = {
    username,
    password,
  };

  return UserModel.createUser(user)
    .then((dbResponse) => {
      if (dbResponse.password === password) {
        const payload = {
          username: username,
        };
        const token = jwt.sign(payload, "SUPER_SECRET", {
          expiresIn: "14d",
        });
        return response
          .cookie("token", token, { httpOnly: true })
          .status(200)
          .send({ username });
      }

      return response.status(401).send("Invalid password");
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

//add a review
// router.post("/:username/review", function (request, response) {
//   const username = request.params.username;
//   const reviewId = request.body.reviewId;
//   return UserModel.addNewReview(username, reviewId)
//     .then((user) => {
//       response.status(200).send(user);
//     })
//     .catch((error) => {
//       response.status(400).send(error);
//     });
// });

module.exports = router;

// return UserModel.getUserByUserName(username)
// .then((user) => {
//   response.status(200).send(user);
// })
// .catch((error) => {
//   response.status(400).send(error);
// });
// });
