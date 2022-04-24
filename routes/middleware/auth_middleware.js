const jwt = require("jsonwebtoken");
//pull out the data from the cookie and do something with it
module.exports = function (request, response, next) {
  const token = request.cookies.token;
  console.log(token);
  if (!token) {
    console.log("middleware: token is empty");
    response.status(401).send("Unauthorized: No token provided");
  } else {
    console.log("start verifying the token");
    jwt.verify(token, "SUPER_SECRET", function (err, decoded) {
      if (err) {
        console.log(err);
        response.status(401).send("Unauthorized: Invalid token");
      } else {
        request.username = decoded.username;
        //next() let it call the next callback function in the request chain
        next();
      }
    });
  }
};
