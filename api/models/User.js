// Required modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

class User {
  constructor() {
    this.User = mongoose.model("User", UserSchema);
  }

  async validatePassword(password, encrypt) {
    return await bcrypt.compare(password, encrypt);
  }

  async findUser(param) {
    const { username } = param;
    if (username) {
      return await this.User.findOne({ username });
    }
  }

  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async createUser(credentials) {
    const newUser = new this.User(credentials);
    const user = newUser.save();
    return user;
  }
}

module.exports = User;
