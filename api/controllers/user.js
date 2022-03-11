// Class
const classUser = require("./../models/User");
const User = new classUser();

// Delete
const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await User.delete(id);
    res.status(200).json("User has been deleted successful");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update
const update = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, password, photo } = req.body;
    const user = await User.findUser({ id });
    if (password) password = await User.encryptPassword(password);
    const userUpdate = {
      username: username || user.username,
      email: email || user.email,
      password: password || user.password,
      photo: photo || user.photo,
    };
    const userUpdated = await User.updateUser(id, userUpdate);
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get user in session
const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) return res.status(401).json("You not authenticated");
    const user = await User.findUser({ id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUser,
  update,
  deleteUser,
};
