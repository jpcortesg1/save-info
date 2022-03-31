// Class
const classPost = require("./../models/Post");

// Object
const Post = new classPost();

// Get a post
const get = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await Post.get({ id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
}

// Get all post of a categories
const getPostsCategory = async (req, res) => {
  try {
    const { id: idCategory } = req.params;
    const posts = await Post.get({ idCategory });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete
const deletePost = async (req, res) => {
  try {
    const { id: idUser } = req.user;
    const { id } = req.body;
    if (!id) res.status(400).json("Missing information to delete post");

    const post = await Post.get({ id });
    if (post.idUser !== idUser)
      return res.status(401).json("You can only delete your posts");

    await Post.delete({ id });
    res.status(200).json("The post has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update
const update = async (req, res) => {
  try {
    const { id: idUser } = req.user;
    const { id, banner, title, info } = req.body;

    if (!id) res.status(400).json("Missing information to create the post");
    const post = await Post.get({ id });
    if (post.idUser !== idUser)
      res.status(400).json("You can only update you posts");

    const postUpdate = {
      idUser,
      banner: banner || post.banner,
      title: title || post.title,
      info: info || post.info,
    };
    await Post.update(id, postUpdate);
    const postUpdated = await Post.get({ id });
    res.status(200).json(postUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create
const create = async (req, res) => {
  try {
    const { id: idUser } = req.user;
    const { idCategory, banner, title, info } = req.body;
    if (!idCategory || !banner || !title || !info)
      return res.status(404).json("Missing information to create the post");

    const params = { idUser, idCategory, banner, title, info };
    const newPost = await Post.create(params);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  create,
  update,
  deletePost,
  getPostsCategory,
  get
};
