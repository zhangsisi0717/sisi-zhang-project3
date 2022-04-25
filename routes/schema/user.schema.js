const Schema = require("mongoose").Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    hash: String,
    salt: String,
  },
  {
    collection: "users",
  }
);

module.exports = UserSchema;
