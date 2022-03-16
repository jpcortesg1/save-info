// Class
const classUser = require("./../models/User");
const classRefreshToken = require("./../models/RefreshToken");

// Objects
const User = new classUser();
const RefreshToken = new classRefreshToken();

// Logout
const logout = async (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(401).json("You are not authenticated!");
  try {
    const tokenBd = await RefreshToken.findToken({ token });
    if (!tokenBd) return res.status(403).json("Refresh token is no valid!");
    await RefreshToken.delete(tokenBd._id.toString());
    res.status(200).json("You logged out successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Refresh token
const refresh = async (req, res) => {
  // Take token
  const { token } = req.body;
  if (!token) return res.status(401).json("You are not authenticated!");

  try {
    // Find token
    const tokenBd = await RefreshToken.findToken({ token });
    if (!tokenBd) return res.status(403).json("Refresh token is no valid!");

    // Verify token
    const { error, user } = RefreshToken.verifyToken(
      tokenBd.token,
      process.env.REFRESH_SECRET_KEY
    );
    if (error) return res.status(403).json(error);

    // Delete current token
    await RefreshToken.delete(tokenBd._id.toString());

    // Create new tokens
    const accessToken = RefreshToken.generateAccessToken(user.id);
    const refreshToken = await RefreshToken.generateRefreshToken(user.id);

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user
    const user = await User.findUser({ username });
    if (!user) {
      res.status(400).json("Username or password incorrect");
      return;
    }

    // Validate password
    const validatePassword = await User.validatePassword(
      password,
      user.password
    );
    if (!validatePassword) {
      res.status(400).json("Username or password incorrect");
      return;
    }

    // Create token
    const userId = user._id.toString();
    const accessToken = RefreshToken.generateAccessToken(userId);
    const refreshToken = await RefreshToken.generateRefreshToken(userId);

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Register
const register = async (req, res) => {
  const password = req.body.password;
  try {
    const encryptPassword = await User.encryptPassword(password);
    const credentials = {
      username: req.body.username,
      password: encryptPassword,
      email: req.body.email,
    };
    if (req.body.photo) credentials.photo = req.body.photo;
    else credentials.photo = "no-avatar.jpeg";
    const user = await User.createUser(credentials);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
