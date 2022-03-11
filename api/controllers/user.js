// Class
const classUser = require("./../models/User");
const User = new classUser();

// Login
const login = async (req, res) => {
  const password = req.body.password;
  try {
    const encryptPassword = await User.encryptPassword(password);
    const credentials = {
      username: req.body.username,
      password: encryptPassword,
      email: req.body.email,
    };
    const user = await User.createUser(credentials);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  login,
};
