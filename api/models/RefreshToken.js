// Required modules
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

class RefreshToken {
  constructor() {
    this.RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
  }

  async delete(id) {
    await this.RefreshToken.findByIdAndDelete(id);
  }

  async findToken(params) {
    const { token } = params;
    const tokenBd = await this.RefreshToken.findOne({ token });
    return tokenBd;
  }

  verifyToken(token, key) {
    return jwt.verify(token, key, (err, user) => {
      if (err) {
        return { error: "Token is not valid!" };
      }
      return { user };
    });
  }

  generateAccessToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
  }

  async generateRefreshToken(id) {
    const token = jwt.sign({ id }, process.env.REFRESH_SECRET_KEY);
    const newToken = new this.RefreshToken({ token });
    await newToken.save();
    return token;
  }
}

module.exports = RefreshToken;
